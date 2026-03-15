# Yoltec

Sistema para gestión de doctores, bitácoras y recetas.

Requerimientos iniciales (en español):
- En la sección de doctor, en bitácoras y recetas, debe mostrarse un mensaje cuando se intente agendar sin tener todos los campos completos.
- En recetas, no se deben poder generar múltiples recetas para una misma cita atendida.
- La fecha de emisión debe mostrarse en formato `día/mes/año`.

Este repositorio inicia vacío de stack tecnológico para permitir configurar reglas del proyecto más adelante.


# ===== PARA CREAR Y EMPEZAR A AVANZAR A LA PARTE WEB (Julián & Mario) =====

# Para ingresar a postgres 
sudo su
psql -h localhost -U postgres
password: [ingresa tu contraseña de usuario]

# Dentro de postgres crearas la base de datos 
CREATE DATABASE yoltec_db;
\q

#  Ahora importas el .sql, dirigite a ~/yoltec/database/ desde terminal y escribiras lo siguiente 
cd ~/Yoltec/database/
psql -U postgres -h localhost -d yoltec_db < database/init.sql
password: [ingresas la contraseña de usuario]

# Una vez hecho eso ahora dirigite a ~/Yotec/backend/.env.example 
# Crearas un archivo nuevo llamado .env en la raiz del backend 
# Ahi tendras que copiar todo lo que viene en el .env.example solo cambiaras tu usuario y contraseña de acceso
# Y listo ya tienes la base de datos local, listo para hacer pruebas(esta no tiene datos en las tablas, solo las tablas)