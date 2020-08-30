import Knex from 'knex';
import { TABLE_NAME } from '../models/02_COLLECT_ITEM';

// store values default 
export async function seed(config:Knex) {
    await config(TABLE_NAME).insert([
        { name: 'Lamps', image: 'lamps.svg' },
        { name: 'Battery', image: 'baterry.svg' },
        { name: 'Papers and Cardboard', image: 'papers_and_cardboard.svg' },
        { name: 'Electronic Waste', image: 'electronic_waste.svg' },
        { name: 'Organic Waste', image: 'organic_waste.svg' },
        { name: 'Kitchen Oil', image: 'kitchen_oil.svg' },
    ]);
};