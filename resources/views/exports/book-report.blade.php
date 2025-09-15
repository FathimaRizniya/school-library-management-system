<!DOCTYPE html>
<html>

<head>
    <title>Books Report</title>
    <style>
        @page {
            margin: 20px, 30px;
        }

        body {
            font-family: manrope, sans-serif;
            font-size: 12px;
        }

        header {
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
            /* word-break: break-word; */
        }

        th {
            background-color: #f2f2f2;
        }

        footer {
            position: fixed;
            bottom: -50px;
            left: 0;
            right: 0;
            height: 60px;
            text-align: center;
            font-size: 10px;
        }

        .page-number:after {
            content: counter(page);
        }

        .report-info {
            color: #555;

        }
    </style>
</head>

<body>

    {{-- Header Info --}}
    <table style="border: none; width: 100%;">
        <tr>
            <td style="width: 50%; border: none;">
                <h2>Books Report - Filtered By {{ $filter ?? 'None' }}</h2>
                <div class="report-info">
                    Exported by: {{ auth()->user()->name ?? 'Unknown User' }}<br>
                    Generated on: {{ now()->format('Y-m-d H:i:s') }}<br>
                    Total Books: {{ count($rows) }}<br><br>

                    @if (!empty($filters))
                    <b>Applied Filters:</b>
                        <div style="margin-bottom: 15px;">

                                @foreach ($filters as $filter)

                                  {{ ucfirst($filter['id']) }}: "{{ $filter['value'] }}"<br>

                                @endforeach

                        </div>
                    @endif

                </div>
            </td>
            <td style="text-align: right; width: 50%; border: none;">
                <h2>Library Management System</h2>
                <div class="report-info">
                    Address: 123 Library St, Kurunegala<br>
                    Email: lms@app.com<br>
                    Website: www.lms.com
                </div>
            </td>
        </tr>
    </table>

    {{-- Book Table --}}
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Category</th>
                <th>Cabinet No</th>
                <th>Rack No</th>
                <th>Available Copies</th>
                <th>Publication Year</th>
                <th>Publisher</th>
                <th>Book Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($rows as $row)
                <tr>
                    <td>{{ $row['id'] }}</td>
                    <td>{{ $row['title'] ?? '-' }}</td>
                    <td>{{ $row['author'] ?? '-' }}</td>
                    <td>{{ $row['isbn_no'] ?? '-' }}</td>
                    <td>{{ $row['category']['name'] ?? '-' }}</td>
                    <td>{{ $row['cabinet_no'] ?? '-' }}</td>
                    <td>{{ $row['rack_no'] ?? '-' }}</td>
                    <td>{{ $row['available_copies'] ?? '-' }}</td>
                    <td>{{ $row['publication_year'] ?? '-' }}</td>
                    <td>{{ $row['publisher'] ?? '-' }}</td>
                    <td>{{ $row['book_price'] ?? '-' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{-- Fixed Footer --}}
    <footer>
        <p>Page <span class="page-number"></span></p>
    </footer>

</body>

</html>
