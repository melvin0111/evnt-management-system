from flask import Flask, request, jsonify, make_response, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.exceptions import HTTPException 
from os import environ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Taft#2021@flask_db:3306/Event_management_system'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)  # nullable=True if the phone number is optional
    role = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def json(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
            'phone_number': self.phone_number,
            'role': self.role,
            'password': self.password,  # Consider omitting in real app for security
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
@app.errorhandler(Exception)
def handle_exception(e): 
    if isinstance(e, HTTPException): 
        return e
    return jsonify(error = str(e)), 500
@app.errorhandler(HTTPException)
def handle_http_exception(e): 
    return jsonify(error = str(e.description)), e.code


    
@app.before_first_request
def initialize_database():
    db.create_all()



#create a test route
@app.route('/test', methods=['GET'])
def test():
  return make_response(jsonify({'message': 'test route'}), 200)


# Create a user
@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        if not all(key in data for key in ('username', 'email', 'role', 'password')):
            abort(400, description="Missing required user fields: username, email, role, password")

        new_user = User(
            username=data['username'],
            email=data['email'],
            phone_number=data.get('phone_number'),
            role=data['role'],
            password=data['password']
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.json()), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify(error=str(e.__dict__['orig'])), 500
    except KeyError as e:
        return jsonify(error=f"Missing data for required field: {e}"), 400



# get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.json() for user in users]), 200


# get a user by id
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.json()), 200


# update a user
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.role = data.get('role', user.role)
    user.password = data.get('password', user.password)  # Consider security implications
    db.session.commit()
    return jsonify(user.json()), 200


# delete a user
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200


class Event(db.Model):
    __tablename__ = 'events'

    event_id = db.Column(db.Integer, primary_key=True)  # Renamed from 'id' to 'event_id'
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.TIMESTAMP, nullable=False)
    end_date = db.Column(db.TIMESTAMP, nullable=False)
    location = db.Column(db.JSON, nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)  # Updated reference
    capacity = db.Column(db.Integer, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'location': self.location,
            'organizer_id': self.organizer_id,
            'capacity': self.capacity
        }

@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    new_event = Event(
        name=data['name'],
        description=data['description'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        location=data['location'],
        organizer_id=data['organizer_id'],
        capacity=data['capacity']
    )
    db.session.add(new_event)
    db.session.commit()
    return make_response(jsonify({'message': 'Event created'}), 201)

@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.json() for event in events]), 200

@app.route('/events/<int:id>', methods=['GET'])
def get_event(id):
    event = Event.query.get_or_404(id)
    return jsonify(event.json()), 200

@app.route('/events/<int:id>', methods=['PUT'])
def update_event(id):
    event = Event.query.get_or_404(id)
    data = request.get_json()
    event.name = data.get('name', event.name)
    event.description = data.get('description', event.description)
    event.start_date = data.get('start_date', event.start_date)
    event.end_date = data.get('end_date', event.end_date)
    event.location = data.get('location', event.location)
    event.organizer_id = data.get('organizer_id', event.organizer_id)
    event.capacity = data.get('capacity', event.capacity)
    db.session.commit()
    return jsonify({'message': 'Event updated successfully', 'event': event.json()}), 200

@app.route('/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted successfully'}), 200


class Ticket(db.Model):
    __tablename__ = 'tickets'

    ticket_id = db.Column(db.Integer, primary_key=True)  # Renamed from 'id' to 'ticket_id'
    description = db.Column(db.String(255))
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)  # Make sure this matches the 'event_id' in the 'events' table
    ticket_type = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def json(self):
        return {
            'id': self.id,
            'description': self.description,
            'event_id': self.event_id,
            'ticket_type': self.ticket_type,
            'quantity': self.quantity,
            'price': str(self.price),
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

@app.route('/tickets', methods=['POST'])
def create_ticket():
    data = request.get_json()
    ticket = Ticket(
        description=data['description'],
        event_id=data['event_id'],
        ticket_type=data['ticket_type'],
        quantity=data['quantity'],
        price=data['price']
    )
    db.session.add(ticket)
    db.session.commit()
    return jsonify({'message': 'Ticket created successfully', 'ticket': ticket.json()}), 201

@app.route('/tickets', methods=['GET'])
def get_tickets():
    tickets = Ticket.query.all()
    return jsonify([ticket.json() for ticket in tickets]), 200

@app.route('/tickets/<int:id>', methods=['GET'])
def get_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    return jsonify(ticket.json()), 200

@app.route('/tickets/<int:id>', methods=['PUT'])
def update_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    data = request.get_json()
    ticket.description = data.get('description', ticket.description)
    ticket.event_id = data.get('event_id', ticket.event_id)
    ticket.ticket_type = data.get('ticket_type', ticket.ticket_type)
    ticket.quantity = data.get('quantity', ticket.quantity)
    ticket.price = data.get('price', ticket.price)
    db.session.commit()
    return jsonify({'message': 'Ticket updated successfully', 'ticket': ticket.json()}), 200

@app.route('/tickets/<int:id>', methods=['DELETE'])
def delete_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    db.session.delete(ticket)
    db.session.commit()
    return jsonify({'message': 'Ticket deleted successfully'}), 200


class Order(db.Model):
    __tablename__ = 'orders'

    order_id = db.Column(db.Integer, primary_key=True)  # Renamed from 'id' to 'order_id'
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)
    ticket_id = db.Column(db.Integer, db.ForeignKey('tickets.ticket_id'), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def json(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
            'ticket_id': self.ticket_id,
            'total_amount': str(self.total_amount),
            'status': self.status,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    order = Order(
        user_id=data['user_id'],
        event_id=data['event_id'],
        ticket_id=data['ticket_id'],
        total_amount=data['total_amount'],
        status=data['status']
    )
    db.session.add(order)
    db.session.commit()
    return jsonify({'message': 'Order created successfully', 'order': order.json()}), 201

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.json() for order in orders]), 200

@app.route('/orders/<int:id>', methods=['GET'])
def get_order(id):
    order = Order.query.get_or_404(id)
    return jsonify(order.json()), 200

@app.route('/orders/<int:id>', methods=['PUT'])
def update_order(id):
    order = Order.query.get_or_404(id)
    data = request.get_json()
    order.user_id = data.get('user_id', order.user_id)
    order.event_id = data.get('event_id', order.event_id)
    order.ticket_id = data.get('ticket_id', order.ticket_id)
    order.total_amount = data.get('total_amount', order.total_amount)
    order.status = data.get('status', order.status)
    db.session.commit()
    return jsonify({'message': 'Order updated successfully', 'order': order.json()}), 200

@app.route('/orders/<int:id>', methods=['DELETE'])
def delete_order(id):
    order = Order.query.get_or_404(id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted successfully'}), 200


class ExpenseCategory(db.Model):
    __tablename__ = 'expense_categories'

    exp_categ_id = db.Column(db.Integer, primary_key=True)  # Renamed from 'id' to 'exp_categ_id'
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

@app.route('/expense-categories', methods=['POST'])
def create_expense_category():
    data = request.get_json()
    expense_category = ExpenseCategory(
        name=data['name'],
        description=data['description']
    )
    db.session.add(expense_category)
    db.session.commit()
    return jsonify({'message': 'Expense category created successfully', 'expense_category': expense_category.json()}), 201

@app.route('/expense-categories', methods=['GET'])
def get_expense_categories():
    expense_categories = ExpenseCategory.query.all()
    return jsonify([expense_category.json() for expense_category in expense_categories]), 200

@app.route('/expense-categories/<int:id>', methods=['GET'])
def get_expense_category(id):
    expense_category = ExpenseCategory.query.get_or_404(id)
    return jsonify(expense_category.json()), 200

@app.route('/expense-categories/<int:id>', methods=['PUT'])
def update_expense_category(id):
    expense_category = ExpenseCategory.query.get_or_404(id)
    data = request.get_json()
    expense_category.name = data.get('name', expense_category.name)
    expense_category.description = data.get('description', expense_category.description)
    db.session.commit()
    return jsonify({'message': 'Expense category updated successfully', 'expense_category': expense_category.json()}), 200

@app.route('/expense-categories/<int:id>', methods=['DELETE'])
def delete_expense_category(id):
    expense_category = ExpenseCategory.query.get_or_404(id)
    db.session.delete(expense_category)
    db.session.commit()
    return jsonify({'message': 'Expense category deleted successfully'}), 200


class Expense(db.Model):
    __tablename__ = 'expenses'

    expense_id = db.Column(db.Integer, primary_key=True)  # Renamed from 'id' to 'expense_id'
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('expense_categories.exp_categ_id'), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    paid_at = db.Column(db.TIMESTAMP)
    receipt_url = db.Column(db.String(255))
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def json(self):
        return {
            'expense_id': self.id,
            'event_id': self.event_id,
            'category_id': self.category_id,
            'description': self.description,
            'amount': str(self.amount),
            'paid_at': str(self.paid_at) if self.paid_at else None,
            'receipt_url': self.receipt_url,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

@app.route('/expenses', methods=['POST'])
def create_expense():
    data = request.get_json()
    expense = Expense(
        event_id=data['event_id'],
        category_id=data['category_id'],
        description=data['description'],
        amount=data['amount'],
        paid_at=data.get('paid_at'),  # Optional field
        receipt_url=data.get('receipt_url')  # Optional field
    )
    db.session.add(expense)
    db.session.commit()
    return jsonify({'message': 'Expense created successfully', 'expense': expense.json()}), 201

@app.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.all()
    return jsonify([expense.json() for expense in expenses]), 200

@app.route('/expenses/<int:id>', methods=['GET'])
def get_expense(id):
    expense = Expense.query.get_or_404(id)
    return jsonify(expense.json()), 200

@app.route('/expenses/<int:id>', methods=['PUT'])
def update_expense(id):
    expense = Expense.query.get_or_404(id)
    data = request.get_json()
    expense.event_id = data.get('event_id', expense.event_id)
    expense.category_id = data.get('category_id', expense.category_id)
    expense.description = data.get('description', expense.description)
    expense.amount = data.get('amount', expense.amount)
    expense.paid_at = data.get('paid_at', expense.paid_at)
    expense.receipt_url = data.get('receipt_url', expense.receipt_url)
    db.session.commit()
    return jsonify({'message': 'Expense updated successfully', 'expense': expense.json()}), 200

@app.route('/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    expense = Expense.query.get_or_404(id)
    db.session.delete(expense)
    db.session.commit()
    return jsonify({'message': 'Expense deleted successfully'}), 200


class Salary(db.Model):
    __tablename__ = 'salaries'

    salary_id = db.Column(db.Integer, primary_key=True)  # Renamed from 'id' to 'salary_id'
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    hourly_rate = db.Column(db.Numeric(10, 2), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    paid_at = db.Column(db.TIMESTAMP)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def json(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'name': self.name,
            'hourly_rate': str(self.hourly_rate),
            'total_amount': str(self.total_amount),
            'paid_at': str(self.paid_at) if self.paid_at else None,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

@app.route('/salaries', methods=['POST'])
def create_salary():
    data = request.get_json()
    salary = Salary(
        event_id=data['event_id'],
        name=data['name'],
        hourly_rate=data['hourly_rate'],
        total_amount=data['total_amount'],
        paid_at=data.get('paid_at')  # Optional field
    )
    db.session.add(salary)
    db.session.commit()
    return jsonify({'message': 'Salary created successfully', 'salary': salary.json()}), 201

@app.route('/salaries', methods=['GET'])
def get_salaries():
    salaries = Salary.query.all()
    return jsonify([salary.json() for salary in salaries]), 200

@app.route('/salaries/<int:id>', methods=['GET'])
def get_salary(id):
    salary = Salary.query.get_or_404(id)
    return jsonify(salary.json()), 200

@app.route('/salaries/<int:id>', methods=['PUT'])
def update_salary(id):
    salary = Salary.query.get_or_404(id)
    data = request.get_json()
    salary.event_id = data.get('event_id', salary.event_id)
    salary.name = data.get('name', salary.name)
    salary.hourly_rate = data.get('hourly_rate', salary.hourly_rate)
    salary.total_amount = data.get('total_amount', salary.total_amount)
    salary.paid_at = data.get('paid_at', salary.paid_at)
    db.session.commit()
    return jsonify({'message': 'Salary updated successfully', 'salary': salary.json()}), 200

@app.route('/salaries/<int:id>', methods=['DELETE'])
def delete_salary(id):
    salary = Salary.query.get_or_404(id)
    db.session.delete(salary)
    db.session.commit()
    return jsonify({'message': 'Salary deleted successfully'}), 200


if __name__ == '__main__': 
  app.run(host = '0.0.0.0', port = 5000, debug = True)