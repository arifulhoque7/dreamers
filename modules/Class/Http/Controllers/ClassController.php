<?php

namespace Modules\Class\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Class\Entities\Classes;
use Illuminate\Support\Facades\Session;
use Illuminate\Contracts\Support\Renderable;
use Modules\Class\DataTables\ClassesDataTable;
use Modules\Class\Http\Requests\ClassStoreRequest;
use Modules\Class\Http\Requests\ClassUpdateRequest;
use Modules\Class\Http\Requests\AssignStudentRequest;
use Modules\Class\Http\Requests\AssignTeacherRequest;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function __construct()
    {
        $this->middleware(['auth']);
        $this->middleware('request:ajax', ['only' => ['store', 'update', 'destroy', 'edit']]);
        \cs_set('theme', [
            'title' => 'Class Lists',
            'back' => \back_url(),
            'breadcrumb' => [
                [
                    'name' => 'Dashboard',
                    'link' => route('admin.dashboard'),
                ],
                [
                    'name' => 'Class Lists',
                    'link' => false,
                ],
            ],
            'rprefix' => 'admin.class',
        ]);
    }

    public function index(ClassesDataTable $dataTable)
    {
        return $dataTable->render('class::class.index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('class::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(ClassStoreRequest $request)
    {
        $randomNumber = mt_rand(100000, 999999); 
        $randomNumberWithPrefix = "DA" . $randomNumber;
        $requestData = $request->all();
        $requestData['code'] = $randomNumberWithPrefix;
        $classes = new Classes();
        $classes->fill($requestData);
        $inserted = $classes->save();

        if (!$inserted) {
            return response()->json(['error' => 'Class has not been created successfully.']);
        }
        return response()->json(['success' => 'Class has been created successfully.']);
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit(Request $request)
    {
        $classes = Classes::find($request->id);
        if (!$classes) {
            return response()->error(null, 'Class not found.', 404);
        }

        return response()->success([
            'classes' => $classes,
        ], 'Class data fetched successfully.', 200);
    }

    /**
     * Update the specified resource in storage.
     * @param ClassUpdateRequest $request
     * @return Renderable
     */
    public function update(ClassUpdateRequest $request)
    {
        $classes = Classes::find($request->id);
        
        if (!$classes) {
            return response()->error(null, 'Class not found.', 404);
        }

        $classes->fill($request->all());
        $updated = $classes->save();

        if (!$updated) {
            return response()->error(null, 'Class has not been updated successfully.');
        }

        return response()->success([
            'classes' => $classes,
        ], 'Class has been updated successfully.', 200);
        
    }

     /**
     * Destroy.
     * @param Classes $class
     * @return view
     */
    public function destroy(Classes $class)
    {
        $classes = Classes::find($class->id);
        // Check if the class exists
        if (!$classes) {
            return response()->error(null, 'Class not found.', 404);
        }
  
        $deleteTeachers = $classes->teachers()->detach();
        $deleteStudents = $classes->students()->detach();
        $deleted = $classes->delete();

        if(!$deleteTeachers || $deleteStudents || !$deleted) {
            return response()->error(null, 'Class has not been deleted successfully.');
        }
        return response()->success(null, 'Class deleted successfully.', 200);
    }

   /**
     * Assign Teacher to Class.
     * @param Classes $class
     * @return view
     */
    public function assignTeacher(Classes $class)
    {
        $classes = Classes::find($class->id);
        if (!$classes) {
            Session::flash('error', 'Class not found.');
            return \redirect()->route(config('theme.rprefix') . '.index');
        }
        
        $teachers = User::whereHas('roles', function ($query) {
            $query->where('name', 'teacher');
        })->where('status','Active')->get();

        return view('class::class.assign-teacher', compact('classes', 'teachers'));
    }
  
    /**
     * Store Assign Teacher.
     * @param AssignTeacherRequest $request
     * @param Classes $class
     * @return view
     */
    public function storeAssignTeacher(AssignTeacherRequest $request ,Classes $class)
    {
        $class = Classes::find($class->id);
        $selectedTeachers = $request->teacher_id;

        if (!$class) {
            return response()->error(null, 'Class not found.', 404);
        }

        // Assign teacher to class
        $updated = $class->teachers()->sync($selectedTeachers);

        if (!$updated) {
            Session::flash('error', 'Teacher has not been assigned successfully.');
            return \redirect()->route(config('theme.rprefix') . '.index');
        }

        Session::flash('success', 'Teacher has been assigned successfully.');
        return \redirect()->route(config('theme.rprefix') . '.index');
    }

    /**
     * Assign Student to Class.
     * @param Classes $class
     * @return view
     */
    public function assignStudent(Classes $class){
        $classes = Classes::find($class->id);
        if (!$classes) {
            Session::flash('error', 'Class not found.');
            return \redirect()->route(config('theme.rprefix') . '.index');
        }
        
        $students = User::whereHas('roles', function ($query) {
            $query->where('name', 'student');
        })->where('status','Active')->get();

        return view('class::class.assign-student', compact('classes', 'students'));

    }

    /**
     * Store Assign Student.
     * @param AssignStudentRequest $request
     * @param Classes $class
     * @return view
     */
    public function storeAssignStudent(AssignStudentRequest $request,Classes $class){
        $class = Classes::find($class->id);
        $selectedStudents = $request->student_id;

        if (!$class) {
            return response()->error(null, 'Class not found.', 404);
        }

        // Assign student to class
        $updated = $class->students()->sync($selectedStudents);

        if (!$updated) {
            Session::flash('error', 'Student has not been assigned successfully.');
            return \redirect()->route(config('theme.rprefix') . '.index');
        }

        Session::flash('success', 'Student has been assigned successfully.');
        return \redirect()->route(config('theme.rprefix') . '.index');
    }

  
    //show class details with related teachers and students
    public function show(Request $request)
    {
        $classes = Classes::find($request->id);
        //class teachers
        $teachers = $classes->teachers()->get();
        //class students
        $students = $classes->students()->get();

        return view('class::class.show', [
            'classes' => $classes,
            'teachers' => $teachers,
            'students' => $students,
        ]);

        // return response()->success([
        //     'classes' => $classes,
        //     'teachers' => $teachers,
        //     'students' => $students,
        // ], 'Class data fetched successfully.', 200);
    }
}
