GRANT ALL PRIVILEGES ON poke_app.* TO 'adrialopezbou'@'localhost';
DROP SCHEMA IF EXISTS poke_app;
CREATE SCHEMA poke_app;
USE poke_app;


CREATE TABLE trainer(
	id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    hobby VARCHAR(255),
    photo VARCHAR(255),
    PRIMARY KEY(id)
);


CREATE TABLE pokemon(
	id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    trainer_id BIGINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(trainer_id) REFERENCES trainer(id)
);

INSERT INTO trainer(name, age, hobby, photo) VALUES
	('Ash Ketchum', 17, 'fisherman', 'http://url')
;

INSERT INTO pokemon(name, trainer_id) VALUES
	('Pikachu', 1),
    ('Bulbasaur', 1),
    ('Charmander', 1)
;