# Архитектура проекта

## Выбранный архитектурный подход

В проекте был применён подход **Feature-Sliced Design (FSD)**.

Данный подход выбран, так как он оптимально подходит для frontend-приложений на React и позволяет организовать код по бизнес-функциональности, а не по типам файлов.

Основные причины выбора:

* улучшение масштабируемости проекта
* уменьшение связанности между модулями
* удобство поддержки и рефакторинга
* чёткое разделение ответственности

---

## Структура проекта

```
src/
├── app/        # Инициализация приложения (store, провайдеры)
├── pages/      # Страницы (роуты)
├── widgets/    # Крупные UI блоки
├── features/   # Бизнес-функциональность
├── entities/   # Бизнес-сущности
├── shared/     # Переиспользуемый код
```

### Описание слоёв

* **app** — точка входа, конфигурация приложения
* **pages** — страницы, собирающие UI из виджетов и фич
* **widgets** — крупные независимые блоки интерфейса (Header, Footer)
* **features** — пользовательские действия (login, register)
* **entities** — бизнес-сущности (user, product, news)
* **shared** — общие утилиты, API, UI-компоненты

---

## Правила импортов

```
app → может импортировать всё
pages → widgets, features, entities, shared
widgets → features, entities, shared
features → entities, shared
entities → shared
shared → ничего не импортирует
```

Запрещено:

* импортировать из верхнего слоя в нижний
* создавать циклические зависимости

---

## Naming Conventions

* Компоненты: PascalCase (UserCard.tsx)
* Хуки: camelCase с префиксом use (useAuth.ts)
* Функции: camelCase
* Константы: SCREAMING_SNAKE_CASE
* Файлы: kebab-case (user-card.tsx)

---

## Примеры кода

### API слой

```js
export const getUser = () => fetch('/api/user')
```

### Хук (бизнес-логика)

```js
export const useUser = () => {
  const [user, setUser] = useState(null)
  return { user }
}
```

### UI компонент

```jsx
export const UserCard = ({ user }) => {
  return <div>{user.name}</div>
}
```
