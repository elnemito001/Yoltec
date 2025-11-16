<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'numero_control',
        'username',
        'nombre',
        'apellido',
        'email',
        'password',
        'tipo',
        'telefono',
        'fecha_nacimiento',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'fecha_nacimiento' => 'date',
    ];

    // Relaciones
    public function citasComoAlumno()
    {
        return $this->hasMany(Cita::class, 'alumno_id');
    }

    public function citasComoDoctor()
    {
        return $this->hasMany(Cita::class, 'doctor_id');
    }

    public function bitacorasComoAlumno()
    {
        return $this->hasMany(Bitacora::class, 'alumno_id');
    }

    public function bitacorasComoDoctor()
    {
        return $this->hasMany(Bitacora::class, 'doctor_id');
    }

    public function recetasComoAlumno()
    {
        return $this->hasMany(Receta::class, 'alumno_id');
    }

    public function recetasComoDoctor()
    {
        return $this->hasMany(Receta::class, 'doctor_id');
    }

    // Helper methods
    public function esAlumno()
    {
        return $this->tipo === 'alumno';
    }

    public function esDoctor()
    {
        return $this->tipo === 'doctor';
    }
}
