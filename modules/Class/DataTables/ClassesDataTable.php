<?php

namespace Modules\Class\DataTables;

use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Modules\Class\Entities\Classes;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Services\DataTable;

class ClassesDataTable extends DataTable
{
    /**
     * Build DataTable class.
     *
     * @param  QueryBuilder  $query Results from query() method.
     */
    public function dataTable(QueryBuilder $query): EloquentDataTable
    {
        return (new EloquentDataTable($query))
            ->editColumn('status', function ($row) {

                $status = '';

                if ($row->status == 1) {
                    $status .= '<span class="badge badge-success-soft sale-badge-ft-13">Active</span>';
                } else {
                    $status .= '<span class="badge badge-danger-soft sale-badge-ft-13">Deactive</span>';
                }

                return $status;
            })

            ->editColumn('view_action', function ($query) {
                return '<a onclick="showViewModal('. $query->id .')" class="btn btn-primary-soft btn-sm me-1" title="View"><i class="fa fa-eye"></i></a>';
            })
            ->addColumn('action', function ($query) {
                return '<a class="btn btn-primary-soft btn-sm me-1" onclick="showEditModal('. $query->id .')" title="Edit"><i class="fa fa-edit"></i></a>' .
                    //add teacher
                    '<a href="' . route(config('theme.rprefix') . '.assign.teacher', $query->id) . '" class="btn btn-primary-soft btn-sm me-1" title="Add Teacher"><i class="fas fa-chalkboard-teacher"></i></a>' .
                    //add student
                    '<a href="' . route(config('theme.rprefix') . '.assign.student', $query->id) . '" class="btn btn-warning-soft btn-sm me-1" title="Add Student"><i class="fas fa-user-graduate"></i></a>' .
                    '<a class="btn btn-danger-soft btn-sm" onclick="delete_modal(\'' . route(config('theme.rprefix') . '.destroy', $query->id) . '\',\'classes-table\')"  title="Delete"><i class="fa fa-trash"></i></a>';
            })
            ->setRowId('id')
            ->rawColumns(['status','view_action','action'])
            ->addIndexColumn();
    }

    /**
     * Get query source of dataTable.
     */
    public function query(Classes $model): QueryBuilder
    {
        return $model->newQuery();
    }

    /**
     * Optional method if you want to use html builder.
     */
    public function html(): HtmlBuilder
    {
        return $this->builder()
            ->setTableId('classes-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->dom("<'row mb-3'<'col-md-4'l><'col-md-4 text-center'B><'col-md-4'f>>rt<'bottom'<'row'<'col-md-6'i><'col-md-6'p>>><'clear'>")
            ->parameters([
                'responsive' => true,
                'autoWidth' => false,
            ])
            ->buttons([
                Button::make('reset')->className('btn btn-success box-shadow--4dp btn-sm-menu'),
                Button::make('reload')->className('btn btn-success box-shadow--4dp btn-sm-menu'),
            ]);
    }

    /**
     * Get the dataTable columns definition.
     */
    public function getColumns(): array
    {
        return [
            Column::make('DT_RowIndex')->title(__('SI'))->searchable(false)->orderable(false)->width(30)->addClass('text-center'),
            Column::make('name')->title(__('Class name'))->defaultContent('N/A'),
            Column::make('code')->title(__('Class code'))->defaultContent('N/A'),
            Column::make('description')->title(__('Class Description'))->defaultContent('N/A'),
            Column::make('status')->title(__('Status'))->defaultContent('N/A'),
            Column::make('view_action')->title(__('View'))
                ->searchable(false)
                ->exportable(false)
                ->printable(false)
                ->width(50)
                ->addClass('text-center'),
            Column::computed('action')
                ->title(__('Action'))
                ->searchable(false)
                ->exportable(false)
                ->printable(false)
                ->width(250)
                ->addClass('text-center'),
        ];
    }

    /**
     * Get filename for export.
     */
    protected function filename(): string
    {
        return 'Classes_' . date('YmdHis');
    }
}
