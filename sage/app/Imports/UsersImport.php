<?php

namespace App\Imports;

use App\Models\User;
use App\Models\DepartmentChief;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Carbon\Carbon;


class UsersImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $depChief = DepartmentChief::new([
            'mandat' => $row['mandat']
        ]);

        return new User([
            'name' => $row['nom'],
            'prenom' => $row['prenom'],
            'email' => $row['email'],
            'departement' => $row['departement'],
            'number' => $row['numero_de_telephone'],
            'address' => $row['addresse'],
            'password' => Hash::make($row['mot_de_passe']),
            'date_naissance' => $row['date_de_naissance'],
            'cin' => $row['cin'],
            'profile_type' => DepartmentChief::class,
            'profile_id' => $depChief->id,
        ]);
    }

    public function rules() : array
    {
        return [
            '*.name' => 'required|string|max:255',
            '*.prenom' => 'required|string|max:255',
            '*.email' => 'required|email|unique:users,email',
            '*.departement' => 'required|string|max:255',
            '*.number' => 'required|string|max:20',
            '*.address' => 'required|string',
            '*.password' => 'required|string|min:6',
            '*.date_naissance' => 'required|date|before:today',
            '*.cin' => 'required|string|unique:users,cin',
            '*.mandat' => 'required|string|max:255',
        ];
    }
}
