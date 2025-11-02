import { Link } from 'react-router-dom';

function FooterDefault() {
    return (
        <footer>
            <p>Blog Lele &copy; Copyright  {new Date().getFullYear()}/{new Date().toLocaleString('default', {month: 'long'})}</p>
        </footer>
    )
}

export default FooterDefault;