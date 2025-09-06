//общий макет админки с меню
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Панель администратора</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/admin">Главная страница</Link>
          <Link to="/admin/Paintings">Картины</Link>
          <Link to="/admin/artists">Художники</Link>
          <Link to="/admin/users">Пользователи</Link>
          <Link to="/admin/settings">Настройки</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
