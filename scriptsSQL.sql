CREATE TABLE `TB_Keys` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `chave` varchar(255) NOT NULL,
  `data_criacao` datetime DEFAULT NULL,
  `data_expiracao` datetime DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `id_usuario` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `TB_Keys_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `TB_Usuarios` (`usu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `TB_Usuarios` (
  `usu_id` char(36) NOT NULL DEFAULT (uuid()),
  `usu_nome` varchar(255) NOT NULL,
  `usu_email` varchar(255) NOT NULL,
  `usu_senha` varchar(255) NOT NULL,
  `is_master` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`usu_id`),
  UNIQUE KEY `usu_nome` (`usu_nome`),
  UNIQUE KEY `usu_email` (`usu_email`),
  UNIQUE KEY `is_master` (`is_master`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
