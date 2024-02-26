<x-app-layout>
    @section('title', 'Class List')
    <x-card>
        <x-slot name='actions'>
            <a href="javascript:void(0);" class="btn btn-success btn-sm" onclick="showCreateModal()"><i
                    class="fa fa-plus-circle"></i>&nbsp;{{ __('Add Class') }}</a>
        </x-slot>

        <div>
            <x-data-table :dataTable="$dataTable" />
        </div>
    </x-card>
    @push('modal')
        <x-modal id="create-class-modal" :title="__('Create Class')">

            <form action="javascript:void();" class="needs-validation" id="create-class-form">
                <div class="modal-body">
                    <div class="row">
                        <div class="cust_border form-group mb-3 mx-0 pb-3 row">
                            <label for="name" class="col-lg-3 col-form-label ps-0">
                                {{ __('Class Name') }}
                                <span class="text-danger">*</span>
                            </label>
                            <div class="col-lg-9 p-0">
                                <input type="text" class="form-control" name="name" id="name"
                                    placeholder="{{ __('Class Name') }} " autocomplete required>
                            </div>
                        </div>

                        <div class="cust_border form-group mb-3 mx-0 pb-3 row">
                            <label for="description" class="col-lg-3 col-form-label ps-0">
                                {{ __('Description') }}
                            </label>
                            <div class="col-lg-9 p-0">
                                <textarea name="description" id="description" class="form-control" placeholder="{{ __('Description') }}"
                                    style="min-height: 100px;"></textarea>
                            </div>
                        </div>

                        <div class="cust_border form-group mb-3 mx-0 pb-3 row">
                            <label for="status" class="col-lg-3 col-form-label ps-0 label_status">
                                {{ __('Status') }}
                                <span class="text-danger">*</span>
                            </label>
                            <div class="col-lg-9 p-0">
                                <select name="status" id="status" class="form-control">
                                    <option value="1">{{ __('Active') }}</option>
                                    <option value="0">{{ __('Deactive') }}</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">{{ __('Close') }}</button>
                    <button class="btn btn-success" type="submit" id="create_submit">{{ __('Add') }}</button>
                </div>
            </form>

        </x-modal>
        <x-modal id="edit-class-modal" :title="__('Update Class')">
            <form action="javascript:void();" class="needs-validation" id="update-class-form">
                <input type="hidden" name="id" id="update_class_id">
                <div class="modal-body">
                    <div class="row">

                        <div class="cust_border form-group mb-3 mx-0 pb-3 row">
                            <label for="name" class="col-lg-3 col-form-label ps-0">
                                {{ __('Class Name') }}
                                <span class="text-danger">*</span>
                            </label>
                            <div class="col-lg-9 p-0">
                                <input type="text" class="form-control" name="name" id="update_name"
                                    placeholder="{{ __('Class Name') }} " autocomplete required>
                            </div>
                        </div>
                        <div class="cust_border form-group mb-3 mx-0 pb-3 row">
                            <label for="description" class="col-lg-3 col-form-label ps-0">
                                {{ __('Description') }}
                            </label>
                            <div class="col-lg-9 p-0">
                                <textarea name="description" id="update_description" class="form-control" placeholder="{{ __('Description') }}"
                                    style="min-height: 100px;"></textarea>
                            </div>
                        </div>
                        <div class="cust_border form-group mb-3 mx-0 pb-3 row">
                            <label for="status" class="col-lg-3 col-form-label ps-0">
                                {{ __('Status') }}
                                <span class="text-danger">*</span>
                            </label>
                            <div class="col-lg-9 p-0">
                                <select name="status" id="update_status" class="form-control">
                                    <option value="1">{{ __('Active') }}</option>
                                    <option value="0">{{ __('Deactive') }}</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">{{ __('Close') }}</button>
                    <button class="btn btn-success" type="submit" id="create_submit">{{ __('Update') }}</button>
                </div>
            </form>
        </x-modal>
        <x-modal id="view-class-modal" :title="__('View Class Details')">
            <div class="view-class-info">

            </div>  
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
        </x-modal>
        <x-modal id="delete-class-modal" :title="__('Delete Permission')">
            <form action="javascript:void();" class="needs-validation" id="delete-class-modal-form">
                <input type="hidden" name="id" id="class_delete_id">
                <div class="modal-body">
                    <p>{{ 'You won\'t be able to revert this!' }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">{{ __('Close') }}</button>
                    <button class="btn btn-primary" type="submit" id="create_submit">{{ __('Delete') }}</button>
                </div>
            </form>
        </x-modal>
    @endpush
    <div id="page-axios-data" data-table-id="#classes-table"
        data-create="{{ route(config('theme.rprefix') . '.store') }}"
        data-edit="{{ route(config('theme.rprefix') . '.edit') }}"
        data-view="{{ route(config('theme.rprefix') . '.show') }}"
        data-update="{{ route(config('theme.rprefix') . '.update') }}">
    </div>

    @push('js')
        <script src="{{ module_asset('js/class/index.js') }}"></script>
    @endpush
</x-app-layout>
