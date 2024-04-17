/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const hasUsersTable = await knex.schema.hasTable('users');
    if (!hasUsersTable) {
    

    await knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('username', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('phone_number', 255);
        table.string('role', 255);
        table.integer('created_by').unsigned();
        table.string('password', 255).notNullable();
        table.timestamps(true, true);
        table.foreign('created_by').references('id').inTable('users');
        table.index('email', 'idx_user_email');
        table.index('created_by', 'idx_user_created_by');

    })
    await knex.schema.createTable('events', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('description', 255).notNullable();
        table.timestamp('start_date').notNullable();
        table.timestamp('end_date').notNullable();
        table.json('location').notNullable();
        table.integer('user_id').unsigned();
        table.integer('capacity').notNullable();
        table.string('status', 255).notNullable().defaultTo('UPCOMING');
        table.timestamps(true, true);
        table.foreign('user_id').references('users.id');
        table.index(['start_date', 'end_date'], 'idx_start_date_end_date');
        table.index('user_id', 'idx_user_id');
    })


    await knex.schema.createTable('tickets', function (table) {
        table.increments('id').primary();
        table.string('description', 255);
        table.integer('event_id').unsigned().notNullable();
        table.string('ticket_type', 255);
        table.integer('quantity');
        table.decimal('price');
        table.timestamps(true, true);
        table.foreign('event_id').references('id').inTable('events');
        table.index('event_id', 'idx_event_id');
    })

    await knex.schema.createTable('orders', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('event_id').unsigned().notNullable();
        table.integer('ticket_id').unsigned().notNullable();
        table.integer('quantity').notNullable().defaultTo(1);
        table.float('total_amount').notNullable();
        table.integer('status');
        table.timestamps(true, true);
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('event_id').references('id').inTable('events');
        table.foreign('ticket_id').references('id').inTable('tickets');
        table.index(['user_id', 'event_id'], 'idx_user_id_event_id');
        table.index('event_id', 'idx_order_event_id');
        table.index('user_id', 'idx_order_user_id');
    })
    await knex.schema.createTable('expense_categories', function (table) {
        table.increments('id').primary();
        table.string('name', 255);
        table.string('description', 255);
        table.timestamps(true, true);
    })
    await knex.schema.createTable('expense', function (table) {
        table.increments('id').primary();
        table.integer('event_id').unsigned().notNullable();
        table.integer('category_id').unsigned().notNullable();
        table.string('description', 255);
        table.float('amount');
        table.datetime('paid_at');
        table.string('receipt_url', 255);
        table.timestamps(true, true);
        table.foreign('event_id').references('id').inTable('events');
        table.foreign('category_id').references('id').inTable('expense_categories');
        table.index('event_id', 'idx_expense_event_id');
        table.index(['category_id', 'event_id'], 'idx_expense_category_event_id');
    })



    await knex.schema.createTable('salaries', function (table) {
        table.increments('id').primary();
        table.integer('event_id').unsigned().notNullable();
        table.string('name', 255);
        table.decimal('hourly_rate');
        table.decimal('total_amount');
        table.datetime('paid_at');
        table.timestamps(true, true);
        table.foreign('event_id').references('id').inTable('events');
        table.index('event_id', 'idx_salary_event_id');
    })

}
    return
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTableIfExists('orders'),
        knex.schema.dropTableIfExists('expense'),
        knex.schema.dropTableIfExists('expense_categories'),
        knex.schema.dropTableIfExists('tickets'),
        knex.schema.dropTableIfExists('salaries'),
        knex.schema.dropTableIfExists('events'),
        knex.schema.dropTableIfExists('users'),


    ]);
};
