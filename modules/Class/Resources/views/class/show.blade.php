<h6>Class Information</h6>
<table class="table table-bordered table-striped">
    <tr>
        <th>Name</th>
        <td>{{ $classes->name }}</td>
    </tr>
    <tr>
        <th>Code</th>
        <td>{{ $classes->code }}</td>
    </tr>
    <tr>
        <th>Description</th>
        <td>{{ $classes->description }}</td>
    </tr>
</table>

<h6>Teachers</h6>
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($teachers as $teacher)
        <tr>
            <td>{{ $teacher->name }}</td>
            <td>{{ $teacher->email }}</td>
            <td>{{ $teacher->phone }}</td>
        </tr>
        @endforeach
    </tbody>
</table>

<h6>Students</h6>
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($students as $student)
        <tr>
            <td>{{ $student->name }}</td>
            <td>{{ $student->email }}</td>
            <td>{{ $student->phone }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
