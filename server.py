"""Server for my unnamed app."""

from flask import Flask, render_template, request, redirect, url_for
from model import db, Country, Link, Review, connect_to_db
# from sqlalchemy.orm import sessionmaker
from jinja2 import StrictUndefined




app = Flask(__name__)

@ app.route('/')
def index():
    """Homepage"""
    
    item = db.session.query(Country.country_name, Link.link).join(Link).all()

    # revs = Review.query.filter_by(moderation_status="approved").all()
    rev = db.session.query(
        Review.date,
        Review.text,
        Review.score
    ).filter_by(moderation_status='approved').all()

    
    return render_template("index.html", item=item, rev=rev) 
    

@ app.route('/moderation/approved/<id>', methods=["POST", "GET"])
def update_status(id):
    

    id = Review.query.get(id)
    id.moderation_status = 'approved'
    db.session.commit()

    print(id)

    # return redirect(url_for("approved"))
    return render_template("approved.html", id=id)

@ app.route('/moderation/rejected/<id>', methods=["POST, GET"])
def reject_status(id):
    id = Review.query.get(id)
    id.moderation_status = 'rejected'
    db.session.commit()

    return f" Rejected"


@app.route('/submitreview', methods=['POST', 'GET'])
def submit_review():
    text= request.form.get("review")
    
    country=request.form.get("country")
    if text is not None:
        r = Review(moderation_status="pending")

        return redirect('/', code=302)

    item = db.session.query(Country.id, Country.country_name).all()
    return render_template('submitreview.html', item=item)

@ app.route('/moderation')
def review_status():

    rstatus = Review.query.filter_by(moderation_status='pending')

    

    

    return render_template("moderation.html", rstatus=rstatus)


if __name__ == '__main__':
    connect_to_db(app)
    # app.url_map.strict_slashes=False
    app.run(host='0.0.0.0', debug=True)