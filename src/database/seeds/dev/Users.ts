import * as Knex from "knex";
import * as Promise from 'bluebird';
import dbConfig from "../../dbConfig";

exports.seed =  function (knex: Knex): Promise<any> {
    return knex(dbConfig.tables.user.name).del()
        .then(function () {
            return knex(dbConfig.tables.user.name).insert([
                {
                    name: 'John Doe',
                    email: 'john.doe@latasna.com',
                    password: '$2a$10$y/eo3/gCQtGxZ7BAaFZQnOh8qRzX19Y5wXDFzTnGIQNSfmfeP7LNu',
                },
                {
                    name: 'Michael Uder',
                    email: 'michael.uder@latasna.com',
                    password: '$2a$10$y/eo3/gCQtGxZ7BAaFZQnOh8qRzX19Y5wXDFzTnGIQNSfmfeP7LNu',
                },
                {
                    name: 'Peter Lahky',
                    email: 'peter.lahky@latasna.com',
                    password: '$2a$10$y/eo3/gCQtGxZ7BAaFZQnOh8qRzX19Y5wXDFzTnGIQNSfmfeP7LNu',
                },
                {
                    name: 'Martin Tazky',
                    email: 'martin.tazky@latasna.com',
                    password: '$2a$10$y/eo3/gCQtGxZ7BAaFZQnOh8qRzX19Y5wXDFzTnGIQNSfmfeP7LNu',
                },
                {
                    name: 'Anna Vojovska',
                    email: 'anna.vojovska@latasna.com',
                    password: '$2a$10$y/eo3/gCQtGxZ7BAaFZQnOh8qRzX19Y5wXDFzTnGIQNSfmfeP7LNu',
                },
                {
                    name: 'Jozef Dressel',
                    email: 'jozef.dressel@latasna.com',
                    password: '$2a$10$y/eo3/gCQtGxZ7BAaFZQnOh8qRzX19Y5wXDFzTnGIQNSfmfeP7LNu',
                },
                {
                    name: 'Robert Landl',
                    email: 'robert.landl@latasna.de',
                    password: '$2a$10$y/eo3/gCQtGxZ7BAaFZQnOh8qRzX19Y5wXDFzTnGIQNSfmfeP7LNu',
                },
                {
                    name: 'Petra Slavikova',
                    email: 'petra.slavikova@latasna.com',
                    password: '$2a$10$y/eo3/gCQtGxZ7BAaFZQnOh8qRzX19Y5wXDFzTnGIQNSfmfeP7LNu',
                },
                {
                    name: 'Oliver Ladovy',
                    email: 'oliver.ladovy@latasna.com',
                    password: '$2a$10$y/eo3/gCQtGxZ7BAaFZQnOh8qRzX19Y5wXDFzTnGIQNSfmfeP7LNu',
                },
                {
                    name: 'Marcel Dvorak',
                    email: 'marcel.dvorak@latasna.com',
                    password: '$2a$10$y/eo3/gCQtGxZ7BAaFZQnOh8qRzX19Y5wXDFzTnGIQNSfmfeP7LNu',
                }
            ])
        })
}