<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage with Dashboard</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background-color: rgba(0, 0, 0, 0.5);
        }
    </style>

</head>
<body>
    <header class="bg-success text-white text-center py-4">
        <h1>Welcome to ToDoList</h1>
    </header>

    <div class="container mt-5" style="padding-top:100px">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg " >
                    <div class="card-header bg-success text-white text-center" style="--bs-bg-opacity: .8;">
                        <h3>Dashboard</h3>
                    </div>
                    <div class="card-body text-center p-4">
                        <h5 class="card-title">Want To List Out The Thing You Want?</h5>
                        <p class="card-text">Get Start It Using Out Website</p>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <a href="Homepage.php">
                                <button type="button" class="btn btn-outline-success shadow">Get Start</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>

    <footer class="text-light text-center py-3 mt-5" >
        <p>&copy; 2024 Banana Milkshake. All Rights Reserved.</p>
    </footer>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
