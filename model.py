
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import os
import pdb


db = SQLAlchemy()


class Country(db.Model):
    """A country"""
    __tablename__ = 'countries'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    country_name = db.Column(db.String(60))

    def __repr__(self):
        return f'country_id={self.id} name={self.country_name}'


class Review(db.Model):
    """A review"""
    __tablename__= 'reviews'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    text = db.Column(db.String(5000))
    score = db.Column(db.Integer)
    moderation_status = db.Column(db.String)
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'))
    country = db.relationship('Country', backref='reviews')

    def __repr__(self):
   
        return f' id = {self.id} text= {self.text[0:9]}'


class Link(db.Model):
    """A link"""
    __tablename__='links'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    link = db.Column(db.String)
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'))
    country = db.relationship('Country', backref='links')

    def __repr__(self):
        return f'url={self.link} country={self.country.country_name}'


class User(UserMixin, db.Model):
    
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(100))

    def __repr__(self):
        
        return f' email={self.email} '



def connect_to_db(app, db_uri="postgresql:///countryrating", echo=True):
    """Connect to database"""
    
    app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    app.config["SQLALCHEMY_ECHO"] = echo
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    print("connected to db")
print(__name__)
if __name__ == '__main__':
    from server import app
    
    connect_to_db(app)
    





