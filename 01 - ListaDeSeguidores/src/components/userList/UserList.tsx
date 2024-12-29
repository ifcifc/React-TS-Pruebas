import { IChildren } from "../../common/IChildren";
import './UserList.css';


interface UserListProps extends IChildren{
    //Sin propiedades de momento
}

export default function UserList({children}: UserListProps): JSX.Element {
    return (
        <article className="ul-article">
            <h3>Usuarios</h3>
            <hr/>
            <div className="ul-list">
                {children}
            </div>
        </article>
    );
}