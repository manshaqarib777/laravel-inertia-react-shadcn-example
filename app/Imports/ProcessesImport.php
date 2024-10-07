<?php

namespace App\Imports;

use App\Models\Process;
use App\Models\ProcessItem;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProcessesImport implements ToModel, WithHeadingRow
{
    // This will keep track of whether the process has already been created
    protected $process;

    public function model(array $row)
    {
        // If this is the first row, create the process using the product_name from the first row
        if (!$this->process) {
            $this->process = Process::create([
                'process_name' => $row['prozessbezeichnung'], // First row's product_name as process_name
            ]);
        }

        // Add each serial number and product name as items to the process
        ProcessItem::create([
            'process_id' => $this->process->id,
            'serial_number' => $row['prozesscode'],
            'product_name' => $row['prozessbezeichnung'],
        ]);
    }
}

