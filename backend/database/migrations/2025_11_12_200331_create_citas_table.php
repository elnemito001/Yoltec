<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('citas', function (Blueprint $table) {
            $table->id();
            $table->string('clave_cita')->unique(); // Clave única de la cita
            $table->foreignId('alumno_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('doctor_id')->nullable()->constrained('users')->onDelete('set null');
            $table->date('fecha_cita');
            $table->time('hora_cita');
            $table->string('motivo')->nullable();
            $table->enum('estatus', ['programada', 'atendida', 'cancelada'])->default('programada');
            $table->dateTime('fecha_hora_atencion')->nullable(); // Cuando se atendió
            $table->text('notas')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('citas');
    }
};
