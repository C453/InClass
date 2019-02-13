#user = User.create(email: 'user@example.com', name: 'John Doe', password: "password")
#code = SecureRandom.hex[0..6]
#Course.create(name: 'CS 408', code: code, expires: '2019-05-10')
#user.courses << Course.find_by(code: code)
#user.save!

Document.create({
    :id => 1, 
    :name => 'Test Image',
    :file => File.new('test.jpg'),
    :expires => '2019-12-31',
    :public => true,
    :course_id => 1,
})