user = User.create(email: 'user@example.com', name: 'John Doe', password: "password")
Course.create(name: 'CS 408', code: "JS3G6", expires: '2019-05-10')
user.courses << Course.find_by(code: "JS3G6")