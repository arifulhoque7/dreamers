<x-app-layout>
    @section('title', 'Assign Teacher')
    <x-card>
        <x-slot name='actions'>
            <a href="{{ route(config('theme.rprefix') . '.index') }}" class="btn btn-success btn-sm"><i
                    class="fa fa-list"></i>&nbsp;{{ __('Class List') }}</a>
        </x-slot>

        <div>
            <form enctype="multipart/form-data"
                action="{{route(config('theme.rprefix') . '.assign.teacher.store', $classes->id) }}"
                method="POST" class="needs-validation" enctype="multipart/form-data">
                @csrf
                <div class=" row">
                    <div class="col-md-12">
                        <div class="form-group pt-1 pb-1">
                            <h5> Class Name: <b>{{ $classes->name }}</b></h5>
                            <h5> Class Code: <b>{{ $classes->code }}</b></h5>
                        </div>
                        <hr>
                        <div class="form-group pt-1 pb-1">
                            <h5 for="name" class="font-black">{{ __('Teachers list') }}</h5>
                            
                            @foreach ($teachers as $teacher)
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="teacher_id" name="teacher_id[]" value="{{ $teacher->id }}">
                                <label class="custom-control-label" for="teacher_id">{{ $teacher->name }}</label>
                            </div>
                            @endforeach
                            @error('name')
                                <p class="text-danger pt-2">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-12 ">
                        <div class="form-group pt-1 pb-1 text-center">
                            <button type="submit" class="btn btn-success btn-round">{{ __('Save') }}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </x-card>

</x-app-layout>
