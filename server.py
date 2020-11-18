"""Server for my unnamed app."""

from flask import Flask, Blueprint, render_template, request, redirect, url_for
from model import db, Country, Link, Review, connect_to_db, User
from jinja2 import StrictUndefined
from flask_login import LoginManager, login_required, current_user
import json
from sqlalchemy import asc, desc

app = Flask(__name__)
app.secret_key = "Oc_t#o20$_b"

login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
    return User.query.get(int(id))

#bluerpint for auth route in app
from auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)



@ app.route('/')
def index():
    """Homepage"""
    
    
    q= Review.query.filter_by(moderation_status="approved").order_by(Review.date.desc())
    
    country_filter=request.args.get("country")
    
    if country_filter:

        q=q.filter(Review.country_id==country_filter)

    score_filter = request.args.get("score")

    if score_filter:
        q=q.filter(Review.score==score_filter)
    rev=q.all()
        

    item = db.session.query(Country.country_name, Link.link).join(Link).all()

    country_item=Country.query.all()


    return render_template("index.html", item=item, rev=rev, score_filter=score_filter, country_filter=country_filter, country_item=country_item, ) 

@ app.route('/amCharts/<id>')
def amCharts_redirect(id):
    item = db.session.query(Country.country_name, Link.link).filter(Link.amcharts_id==id).join(Link).first()

    
    return redirect(item.link)



@ app.route('/moderation/approved/<id>', methods=["POST", "GET"])
@login_required
def update_status(id):
    id = Review.query.get(id)
    id.moderation_status = 'approved'
    db.session.commit()

    return render_template("approved.html", id=id)

@ app.route('/moderation/rejected/<id>', methods=["POST", "GET"])
@login_required
def reject_status(id):
    id = Review.query.get(id)
    id.moderation_status = 'rejected'
    db.session.commit()
    print(id)

    return render_template("rejected.html", id=id)


@app.route('/submitreview', methods=['POST', 'GET'])
def submit_review():
    text= request.form.get("review")
    
    if text is not None:
        country=Country.query.filter_by(country_name=request.form.get("country")).first()
        country_id=request.form.get("country")
        score=request.form.get("score")
        r=Review(text=text, score=score, moderation_status='pending', country_id=country_id)
        db.session.add(r)
        db.session.commit()
        return redirect('/')

    item = db.session.query(Country.id, Country.country_name).all()
    return render_template('submitreview.html', item=item)

@ app.route('/moderation')
@login_required
def review_status():

    rstatus = Review.query.filter_by(moderation_status='pending')

    return render_template("moderation.html", rstatus=rstatus, name=current_user.name)


if __name__ == '__main__':
    connect_to_db(app)
    # app.url_map.strict_slashes=False
    app.run(host='0.0.0.0', debug=True)