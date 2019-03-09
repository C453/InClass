class TakeAttendanceController < ApplicationController
    before_action :authenticate_user!

    # POST /take_attendance
    def take_attendance
        params.require(:code)

        lat = params[:lat]
        long = params[:long]

        user = current_user

        attendance = Attendance.find_by(code: params[:code], open: true)
        
        if attendance == nil || !params[:lat] || !params[:long]
            output = {'status' => 'attendance_closed'}.to_json
        else
            unless attendance.users.include? current_user

                dist = getDistanceFromLatLonInKm(lat, long, attendance.latitude, attendance.longitude)

                if dist < 1
                    attendance.users.push(current_user)
                    output = {'status' => 'success'}.to_json

                    ActionCable.server.broadcast "course:#{attendance.course_id}_channel", status: 'attendance',
                    user: current_user.id
                else
                    output = {'status' => 'not in class'}.to_json
                end
            else
                output = {'status' => 'already marked present'}.to_json
            end
        end
        
        render :json => output
    end

    def deg2rad(deg)
        return deg * (Math::PI / 180)
    end

    def getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2)
        r = 6371; # Radius of the earth in km
        dLat = deg2rad(lat2-lat1)
        dLon = deg2rad(lon2-lon1)
        a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)

        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        d = r * c # Distance in km
        return d
    end
end
