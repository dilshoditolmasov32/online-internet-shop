import {Link} from 'react-router'

export default function NotFoundPage() {
  return (
    <div className='notfound'>
      <div className="container">
        <div className="notfound__wrap">
          <div className="notfound__desc">
            <h1 className='notfound__title'>Xatolik! 404 </h1>
            <p className='notfound__text'>Sahifa topilmadi </p>
          </div>
          <div className="notfound__help">
            <p className='notfound__help-text'>Balki bu sahifalar sizga yordam beradi?  </p>
            <div className="notfound__help-links">
              <Link className='link notfound__help-links__link' to='/'>Bosh sahifa</Link>
              <Link className='link notfound__help-links__link' to='/products'>Barcha mahsulotlar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
