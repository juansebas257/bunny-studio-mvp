CREATE TABLE `tasks_states` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL UNIQUE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `tasks_states` VALUES
(1, 'To Do'),
(2, 'Done'),
(3, 'Archived');

CREATE TABLE `tasks` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user` int(11) UNSIGNED NOT NULL,
  `state` int(11) UNSIGNED NOT NULL,
  `description` TEXT NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NULL,
  INDEX (`user`, `state`),
  CONSTRAINT `tasks_users_fk` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_tasks_states_fk` FOREIGN KEY (`state`) REFERENCES `tasks_states` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;