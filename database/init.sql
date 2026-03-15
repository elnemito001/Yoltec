--
-- PostgreSQL database dump
--

\restrict DmS0ebw2jVKmvzjcUinvqhPfCegc1QWvPD9QKXgjke6saBxj4v5MRRQmjM6LMzA

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alumnos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alumnos (
    id_alumno integer NOT NULL,
    id_usuario integer,
    nombre character varying(120) NOT NULL,
    edad integer,
    sexo character varying(10),
    carrera character varying(120),
    numero_control character varying(20),
    tipo_sangre character varying(5),
    estatura_cm integer
);


--
-- Name: alumnos_id_alumno_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.alumnos_id_alumno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: alumnos_id_alumno_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.alumnos_id_alumno_seq OWNED BY public.alumnos.id_alumno;


--
-- Name: citas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.citas (
    id_cita integer NOT NULL,
    id_alumno integer,
    id_doctor integer,
    fecha_cita date NOT NULL,
    hora_cita time without time zone NOT NULL,
    motivo text,
    estado character varying(20) DEFAULT 'pendiente'::character varying,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    probabilidad_inasistencia numeric(4,3),
    riesgo_inasistencia boolean,
    CONSTRAINT citas_estado_check CHECK (((estado)::text = ANY ((ARRAY['pendiente'::character varying, 'aceptada'::character varying, 'rechazada'::character varying, 'reagendada'::character varying, 'cancelada'::character varying, 'no_asistio'::character varying, 'completada'::character varying])::text[])))
);


--
-- Name: citas_id_cita_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.citas_id_cita_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: citas_id_cita_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.citas_id_cita_seq OWNED BY public.citas.id_cita;


--
-- Name: consultas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.consultas (
    id_consulta integer NOT NULL,
    id_cita integer,
    id_doctor integer,
    id_alumno integer,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    motivo text,
    diagnostico text,
    tratamiento text,
    receta text,
    observaciones text
);


--
-- Name: consultas_id_consulta_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.consultas_id_consulta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: consultas_id_consulta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.consultas_id_consulta_seq OWNED BY public.consultas.id_consulta;


--
-- Name: doctores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doctores (
    id_doctor integer NOT NULL,
    id_usuario integer,
    nombre character varying(120) NOT NULL,
    edad integer,
    sexo character varying(10),
    especialidad character varying(120),
    estatura_cm integer
);


--
-- Name: doctores_id_doctor_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.doctores_id_doctor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: doctores_id_doctor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.doctores_id_doctor_seq OWNED BY public.doctores.id_doctor;


--
-- Name: expediente_medico; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expediente_medico (
    id_expediente integer NOT NULL,
    id_alumno integer,
    alergias text,
    padecimientos text,
    observaciones text,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: expediente_medico_id_expediente_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.expediente_medico_id_expediente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: expediente_medico_id_expediente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.expediente_medico_id_expediente_seq OWNED BY public.expediente_medico.id_expediente;


--
-- Name: historial_asistencia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.historial_asistencia (
    id_historial integer NOT NULL,
    id_alumno integer,
    total_citas integer DEFAULT 0,
    citas_asistidas integer DEFAULT 0,
    citas_no_asistidas integer DEFAULT 0
);


--
-- Name: historial_asistencia_id_historial_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.historial_asistencia_id_historial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: historial_asistencia_id_historial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.historial_asistencia_id_historial_seq OWNED BY public.historial_asistencia.id_historial;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    correo character varying(120) NOT NULL,
    password_hash text NOT NULL,
    rol character varying(20) NOT NULL,
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT usuarios_rol_check CHECK (((rol)::text = ANY ((ARRAY['admin'::character varying, 'doctor'::character varying, 'alumno'::character varying])::text[])))
);


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- Name: alumnos id_alumno; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alumnos ALTER COLUMN id_alumno SET DEFAULT nextval('public.alumnos_id_alumno_seq'::regclass);


--
-- Name: citas id_cita; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citas ALTER COLUMN id_cita SET DEFAULT nextval('public.citas_id_cita_seq'::regclass);


--
-- Name: consultas id_consulta; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.consultas ALTER COLUMN id_consulta SET DEFAULT nextval('public.consultas_id_consulta_seq'::regclass);


--
-- Name: doctores id_doctor; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctores ALTER COLUMN id_doctor SET DEFAULT nextval('public.doctores_id_doctor_seq'::regclass);


--
-- Name: expediente_medico id_expediente; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expediente_medico ALTER COLUMN id_expediente SET DEFAULT nextval('public.expediente_medico_id_expediente_seq'::regclass);


--
-- Name: historial_asistencia id_historial; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historial_asistencia ALTER COLUMN id_historial SET DEFAULT nextval('public.historial_asistencia_id_historial_seq'::regclass);


--
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- Data for Name: alumnos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alumnos (id_alumno, id_usuario, nombre, edad, sexo, carrera, numero_control, tipo_sangre, estatura_cm) FROM stdin;
\.


--
-- Data for Name: citas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.citas (id_cita, id_alumno, id_doctor, fecha_cita, hora_cita, motivo, estado, fecha_creacion, probabilidad_inasistencia, riesgo_inasistencia) FROM stdin;
\.


--
-- Data for Name: consultas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.consultas (id_consulta, id_cita, id_doctor, id_alumno, fecha, motivo, diagnostico, tratamiento, receta, observaciones) FROM stdin;
\.


--
-- Data for Name: doctores; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.doctores (id_doctor, id_usuario, nombre, edad, sexo, especialidad, estatura_cm) FROM stdin;
\.


--
-- Data for Name: expediente_medico; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.expediente_medico (id_expediente, id_alumno, alergias, padecimientos, observaciones, fecha_registro) FROM stdin;
\.


--
-- Data for Name: historial_asistencia; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.historial_asistencia (id_historial, id_alumno, total_citas, citas_asistidas, citas_no_asistidas) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.usuarios (id_usuario, correo, password_hash, rol, activo, fecha_creacion) FROM stdin;
\.


--
-- Name: alumnos_id_alumno_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alumnos_id_alumno_seq', 1, false);


--
-- Name: citas_id_cita_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.citas_id_cita_seq', 1, false);


--
-- Name: consultas_id_consulta_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.consultas_id_consulta_seq', 1, false);


--
-- Name: doctores_id_doctor_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.doctores_id_doctor_seq', 1, false);


--
-- Name: expediente_medico_id_expediente_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.expediente_medico_id_expediente_seq', 1, false);


--
-- Name: historial_asistencia_id_historial_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.historial_asistencia_id_historial_seq', 1, false);


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, false);


--
-- Name: alumnos alumnos_id_usuario_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_id_usuario_key UNIQUE (id_usuario);


--
-- Name: alumnos alumnos_numero_control_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_numero_control_key UNIQUE (numero_control);


--
-- Name: alumnos alumnos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_pkey PRIMARY KEY (id_alumno);


--
-- Name: citas citas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_pkey PRIMARY KEY (id_cita);


--
-- Name: consultas consultas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_pkey PRIMARY KEY (id_consulta);


--
-- Name: doctores doctores_id_usuario_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctores
    ADD CONSTRAINT doctores_id_usuario_key UNIQUE (id_usuario);


--
-- Name: doctores doctores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctores
    ADD CONSTRAINT doctores_pkey PRIMARY KEY (id_doctor);


--
-- Name: expediente_medico expediente_medico_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expediente_medico
    ADD CONSTRAINT expediente_medico_pkey PRIMARY KEY (id_expediente);


--
-- Name: historial_asistencia historial_asistencia_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historial_asistencia
    ADD CONSTRAINT historial_asistencia_pkey PRIMARY KEY (id_historial);


--
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- Name: alumnos alumnos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alumnos
    ADD CONSTRAINT alumnos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- Name: citas citas_id_alumno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_id_alumno_fkey FOREIGN KEY (id_alumno) REFERENCES public.alumnos(id_alumno);


--
-- Name: citas citas_id_doctor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_id_doctor_fkey FOREIGN KEY (id_doctor) REFERENCES public.doctores(id_doctor);


--
-- Name: consultas consultas_id_alumno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_id_alumno_fkey FOREIGN KEY (id_alumno) REFERENCES public.alumnos(id_alumno);


--
-- Name: consultas consultas_id_cita_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_id_cita_fkey FOREIGN KEY (id_cita) REFERENCES public.citas(id_cita);


--
-- Name: consultas consultas_id_doctor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_id_doctor_fkey FOREIGN KEY (id_doctor) REFERENCES public.doctores(id_doctor);


--
-- Name: doctores doctores_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctores
    ADD CONSTRAINT doctores_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- Name: expediente_medico expediente_medico_id_alumno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expediente_medico
    ADD CONSTRAINT expediente_medico_id_alumno_fkey FOREIGN KEY (id_alumno) REFERENCES public.alumnos(id_alumno);


--
-- Name: historial_asistencia historial_asistencia_id_alumno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historial_asistencia
    ADD CONSTRAINT historial_asistencia_id_alumno_fkey FOREIGN KEY (id_alumno) REFERENCES public.alumnos(id_alumno);


--
-- PostgreSQL database dump complete
--

\unrestrict DmS0ebw2jVKmvzjcUinvqhPfCegc1QWvPD9QKXgjke6saBxj4v5MRRQmjM6LMzA

