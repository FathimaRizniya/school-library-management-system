<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; background-color: #f7f7f7; padding: 20px;">
    <div style="max-width: 600px; background: #fff; margin: auto; padding: 30px; border-radius: 8px;">
        <h2 style="color: #333;">Welcome, {{ $user->name }}</h2>
        <p>Your library account has been created successfully.</p>
        <p><strong>Email:</strong> {{ $user->email }}</p>
        <p><strong>Password:</strong> {{ $password }}</p>
        <p><a href="{{ url('/login') }}" style="background-color: #101010; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Login Now</a></p>
        <p style="margin-top: 30px;">Thanks,<br>Librarian</p>
    </div>
</body>
</html>
