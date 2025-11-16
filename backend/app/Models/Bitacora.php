<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bitacora extends Model
{
    use HasFactory;

    protected $fillable = [
        'cita_id',
        'alumno_id',
        'doctor_id',
        'diagnostico',
        'tratamiento',
        'observaciones',
        'peso',
        'altura',
        'temperatura',
        'presion_arterial',
    ];

    // Relaciones
    public function cita()
    {
        return $this->belongsTo(Cita::class);
    }

    public function alumno()
    {
        return $this->belongsTo(User::class, 'alumno_id');
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
