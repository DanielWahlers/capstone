CREATE TABLE `users` (
  `id` int PRIMARY KEY auto_increment,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `date_posted` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE `posts` (
  `id` int PRIMARY KEY auto_increment,
  `title` varchar(255) DEFAULT NULL,
  `caption` text DEFAULT NULL,
  `date_posted` TIMESTAMP default CURRENT_TIMESTAMP,
  `location` varchar(255) DEFAULT NULL,
  `tags` text NOT NULL
) ENGINE=InnoDB;

CREATE TABLE `profile` (
  `id` int PRIMARY KEY auto_increment,
  `media_link` text NOT NULL,
  `user_id` int NOT NULL,
  KEY `fk_profile_users_idx` (`user_id`),
  CONSTRAINT `fk_profile_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `media` (
  `id` int PRIMARY KEY auto_increment,
  `media_type` text NOT NULL,
  `position` int NOT NULL,
  `media_link` text NOT NULL,
  `posts_id` int NOT NULL,
  KEY `fk_media_posts1_idx` (`posts_id`),
  CONSTRAINT `fk_media_posts1` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB;


CREATE TABLE `comments` (
  `id` int PRIMARY KEY auto_increment,
  `comment_text` text DEFAULT NULL,
  `comment_type` varchar(255) NOT NULL,
  `date_posted` Timestamp default CURRENT_TIMESTAMP,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  KEY `fk_Comments_posts1_idx` (`post_id`),
  KEY `fk_Comments_users1_idx` (`user_id`),
  KEY `fk_comments_comments1_idx` (`comment_id`),
  CONSTRAINT `fk_Comments_posts1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_Comments_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_comments_comments1_idx` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `follows` (
  `id` int PRIMARY KEY auto_increment,
  `follower` int NOT NULL,
  `following` int NOT NULL,
  `date_posted` timestamp DEFAULT CURRENT_TIMESTAMP,
  KEY `fk_follows_users1_idx` (`follower`),
  KEY `fk_follows_users2_idx` (`following`),
  CONSTRAINT `fk_follows_users1_idx` FOREIGN KEY (`follower`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_follows_users2_idx` FOREIGN KEY (`following`) REFERENCES `users` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `promotes` (
  `id` int PRIMARY KEY auto_increment,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `date_posted` timestamp DEFAULT CURRENT_TIMESTAMP,
  KEY `fk_promotes_users1_idx` (`user_id`),
  KEY `fk_promotes_posts1_idx` (`post_id`),
  CONSTRAINT `fk_promotes_users1_idx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_promotes_posts1_idx` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `likes` (
  `id` int PRIMARY KEY auto_increment,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `date_posted` timestamp DEFAULT CURRENT_TIMESTAMP,
  KEY `fk_likes_users1_idx` (`user_id`),
  KEY `fk_likes_posts2_idx` (`post_id`),
  CONSTRAINT `fk_likes_users1_idx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_likes_posts2_idx` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `dislikes` (
  `id` int PRIMARY KEY auto_increment,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `date_posted` timestamp DEFAULT CURRENT_TIMESTAMP,
  KEY `fk_dislikes_users1_idx` (`user_id`),
  KEY `fk_dislikes_posts1_idx` (`post_id`),
  CONSTRAINT `fk_dislikes_users1_idx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_dislikes_posts1_idx` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB;

CREATE TABLE `authors` (
  `id` int PRIMARY key auto_increment,
  `user_id` int not null,
  `post_id` int not null,
  `date_posted` timestamp default current_timestamp,
  `signed` bit not null default 0,
  Key `fk_authors_users1_idx` (`user_id`),
  KEY `fk_authors_posts1_idx` (`post_id`),
  CONSTRAINT `fk_authors_users1_idx` FOREIGN KEY (`user_id`) references `users` (`id`),
  constraint `fk_authors_posts1_idx` foreign key (`post_id`) references `posts` (`id`)
) ENGINE=InnoDB;

-- insert into users (username, first_name, last_name,password, email) values("AverageJoe", "Joe", "Average", "Joe123", "joeaverage@gmail.com");