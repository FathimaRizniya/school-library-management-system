<!DOCTYPE html>
<html>

<head>
    <title>{{ $title ?? 'Report' }}</title>
    <style>
        @page {
            margin: 20px 20px 30px 20px;
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

        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
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

    {{-- Header --}}
    <table style="border: none; width: 100%;">
        <tr>
            <td style="width: 50%; border: none;">
                <h2>{{ $title ?? 'Report' }}</h2>
                <div class="report-info">
                    Exported by: {{ auth()->user()->name ?? 'Unknown User' }}<br>
                    Generated on: {{ now()->format('Y-m-d H:i:s') }}<br>
                    Total Records: {{ count($rows) }}<br><br>

                    @if (!empty($filters))
                        <b>Applied Filters:</b><br>
                        <div style="margin-bottom: 15px;">
                            @foreach ($filters as $filter)
                                {{ ucfirst($filter['id']) }}: "{{ $filter['value'] }}"<br>
                            @endforeach
                        </div>
                    @endif
                </div>
            </td>
            <td style="text-align: right; width: 50%; border: none;">
                <h2>{{ $orgName ?? 'Library Management System' }}</h2>
                <div class="report-info">
                    Address: {{ $orgAddress ?? '123 Library St, Kurunegala' }}<br>
                    Email: {{ $orgEmail ?? 'lms@app.com' }}<br>
                    Website: {{ $orgWebsite ?? 'www.lms.com' }}
                </div>
            </td>
        </tr>
    </table>

    {{-- Dynamic Table --}}
    <table>
        <thead>
            <tr>
                @foreach ($headers as $header)
                    <th>{{ $header }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach ($rows as $row)
                <tr>
                    @foreach ($columns as $key)
                        <td style="width: {{ $columnWidths[$key] ?? 'auto' }};">
                            {{ filled(data_get($row, $key)) ? data_get($row, $key) : '-' }}
                        </td>
                    @endforeach
                </tr>
            @endforeach
        </tbody>
    </table>

    <footer>
        <p>Page <span class="page-number"></span></p>
    </footer>
</body>

</html>
