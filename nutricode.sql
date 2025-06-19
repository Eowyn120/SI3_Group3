-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2025 a las 00:21:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nutricode`
---- IMPORTANTE: Añade estas dos líneas
CREATE DATABASE IF NOT EXISTS `nutricode`;
USE `nutricode`;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `user`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carbohidratos`
--

CREATE TABLE `carbohidratos` (
  `id` int(11) NOT NULL,
  `cal_carbohidratos` float NOT NULL,
  `gramaje` float NOT NULL,
  `racion` float NOT NULL,
  `seguimiento_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carbohidratos`
--

INSERT INTO `carbohidratos` (`id`, `cal_carbohidratos`, `gramaje`, `racion`, `seguimiento_id`) VALUES
(1, 1890, 472.5, 31.5, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `condicion`
--

CREATE TABLE `condicion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `multiplicador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `condicion`
--

INSERT INTO `condicion` (`id`, `nombre`, `multiplicador`) VALUES
(1, 'Hipermetabólico, sepsis', 45),
(2, 'En reposo, encamado', 25),
(3, 'Sobrepeso / reducción de peso', 20),
(4, 'Prediálisis', 45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imc`
--

CREATE TABLE `imc` (
  `id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imc`
--

INSERT INTO `imc` (`id`, `status`, `min`, `max`) VALUES
(1, 'Desnutrición Proteica', 1, 18.49),
(2, 'Peso Normal', 18.5, 24.9),
(3, 'Sobrepeso', 25, 29.9),
(4, 'Obesidad Leve', 30, 34.9),
(5, 'Obesidad Media', 35, 39.9),
(6, 'Obesidad Morbidad', 40, 999);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lipidos`
--

CREATE TABLE `lipidos` (
  `id` int(11) NOT NULL,
  `cal_lipidos` float NOT NULL,
  `gramaje` float NOT NULL,
  `racion` float NOT NULL,
  `seguimiento_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lipidos`
--

INSERT INTO `lipidos` (`id`, `cal_lipidos`, `gramaje`, `racion`, `seguimiento_id`) VALUES
(1, 787.5, 87.5, 9.72, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nutricionistas`
--

CREATE TABLE `nutricionistas` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `nombres` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `preg_seg` varchar(45) NOT NULL,
  `resp_seg` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nutricionistas`
--

INSERT INTO `nutricionistas` (`id`, `email`, `password`, `nombres`, `apellidos`, `preg_seg`, `resp_seg`) VALUES
(1, 'mark@gmail.com', 'mark2904', 'mark eowyn', 'garcia martinez', 'comida', 'pasta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `nombres` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `cedula` varchar(45) NOT NULL,
  `edad` int(11) NOT NULL,
  `fecha_de_nacimiento` date NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `direccion` varchar(45) DEFAULT 'No especificada',
  `condicion` varchar(45) NOT NULL,
  `ant_familiares` varchar(45) NOT NULL,
  `alergias` varchar(45) NOT NULL,
  `ant_personales` varchar(45) NOT NULL,
  `ant_psicologicos` varchar(45) NOT NULL,
  `patologia_id` int(11) NOT NULL,
  `nutricionistas_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `nombres`, `apellidos`, `cedula`, `edad`, `fecha_de_nacimiento`, `telefono`, `correo`, `direccion`, `condicion`, `ant_familiares`, `alergias`, `ant_personales`, `ant_psicologicos`, `patologia_id`, `nutricionistas_id`) VALUES
(1, 'Mark Eowyn', 'Garcia Martinez', '30326053', 21, '2004-04-29', '04124093207', 'markeowyn@gmail.com', 'El Guafal', 'Masculino', 'Diabetes', 'Ninguna', 'Ninguna', 'Ansiedad', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patologia`
--

CREATE TABLE `patologia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patologia`
--

INSERT INTO `patologia` (`id`, `nombre`) VALUES
(2, 'Cancer'),
(3, 'Anemia'),
(4, 'Hipotiroidismo'),
(5, 'Hipertiroidismo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proteinas`
--

CREATE TABLE `proteinas` (
  `id` int(11) NOT NULL,
  `cal_proteicas` float NOT NULL,
  `gramaje` float NOT NULL,
  `racion` float NOT NULL,
  `seguimiento_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proteinas`
--

INSERT INTO `proteinas` (`id`, `cal_proteicas`, `gramaje`, `racion`, `seguimiento_id`) VALUES
(1, 472.5, 118.13, 16.88, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado`
--

CREATE TABLE `resultado` (
  `id` int(11) NOT NULL,
  `prescripcion` varchar(150) NOT NULL,
  `plan_nutricional` varchar(150) NOT NULL,
  `recomendaciones` varchar(150) NOT NULL,
  `seguimiento_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultado`
--

INSERT INTO `resultado` (`id`, `prescripcion`, `plan_nutricional`, `recomendaciones`, `seguimiento_id`) VALUES
(1, 'holaaaaaaa', 'estooooo', 'FUNCIONAAAAAAA', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimiento`
--

CREATE TABLE `seguimiento` (
  `id` int(11) NOT NULL,
  `motivo` varchar(45) NOT NULL,
  `fecha` date NOT NULL,
  `peso` float NOT NULL,
  `talla` float NOT NULL,
  `imc` float NOT NULL,
  `req_calorico` float NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `imc_id` int(11) NOT NULL,
  `condicion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `seguimiento`
--

INSERT INTO `seguimiento` (`id`, `motivo`, `fecha`, `peso`, `talla`, `imc`, `req_calorico`, `paciente_id`, `imc_id`, `condicion_id`) VALUES
(3, 'Primera Cita', '2025-06-06', 70, 180, 21.6, 3150, 1, 2, 1),
(4, 'Primera Cita', '2025-06-06', 70, 180, 21.6, 3150, 1, 2, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carbohidratos`
--
ALTER TABLE `carbohidratos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seguimiento_id` (`seguimiento_id`);

--
-- Indices de la tabla `condicion`
--
ALTER TABLE `condicion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imc`
--
ALTER TABLE `imc`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lipidos`
--
ALTER TABLE `lipidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seguimiento_id` (`seguimiento_id`);

--
-- Indices de la tabla `nutricionistas`
--
ALTER TABLE `nutricionistas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patologia_id` (`patologia_id`),
  ADD KEY `nutricionistas_id` (`nutricionistas_id`);

--
-- Indices de la tabla `patologia`
--
ALTER TABLE `patologia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proteinas`
--
ALTER TABLE `proteinas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seguimiento_id` (`seguimiento_id`);

--
-- Indices de la tabla `resultado`
--
ALTER TABLE `resultado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seguimiento_id` (`seguimiento_id`);

--
-- Indices de la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paciente_id` (`paciente_id`),
  ADD KEY `imc_id` (`imc_id`),
  ADD KEY `condicion_id` (`condicion_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `carbohidratos`
--
ALTER TABLE `carbohidratos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `condicion`
--
ALTER TABLE `condicion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `imc`
--
ALTER TABLE `imc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `lipidos`
--
ALTER TABLE `lipidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `nutricionistas`
--
ALTER TABLE `nutricionistas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `patologia`
--
ALTER TABLE `patologia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `proteinas`
--
ALTER TABLE `proteinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `resultado`
--
ALTER TABLE `resultado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carbohidratos`
--
ALTER TABLE `carbohidratos`
  ADD CONSTRAINT `carbohidratos_ibfk_1` FOREIGN KEY (`seguimiento_id`) REFERENCES `seguimiento` (`id`);

--
-- Filtros para la tabla `lipidos`
--
ALTER TABLE `lipidos`
  ADD CONSTRAINT `lipidos_ibfk_1` FOREIGN KEY (`seguimiento_id`) REFERENCES `seguimiento` (`id`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`patologia_id`) REFERENCES `patologia` (`id`),
  ADD CONSTRAINT `paciente_ibfk_2` FOREIGN KEY (`nutricionistas_id`) REFERENCES `nutricionistas` (`id`);

--
-- Filtros para la tabla `proteinas`
--
ALTER TABLE `proteinas`
  ADD CONSTRAINT `proteinas_ibfk_1` FOREIGN KEY (`seguimiento_id`) REFERENCES `seguimiento` (`id`);

--
-- Filtros para la tabla `resultado`
--
ALTER TABLE `resultado`
  ADD CONSTRAINT `resultado_ibfk_1` FOREIGN KEY (`seguimiento_id`) REFERENCES `seguimiento` (`id`);

--
-- Filtros para la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD CONSTRAINT `seguimiento_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id`),
  ADD CONSTRAINT `seguimiento_ibfk_2` FOREIGN KEY (`imc_id`) REFERENCES `imc` (`id`),
  ADD CONSTRAINT `seguimiento_ibfk_3` FOREIGN KEY (`condicion_id`) REFERENCES `condicion` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
