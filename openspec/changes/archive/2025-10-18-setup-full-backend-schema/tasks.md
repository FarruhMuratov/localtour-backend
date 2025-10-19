## Этап 1: Фундамент — Пользователи и Аутентификация
- [x] 1.1. **Firestore:** Спроектировать и утвердить схему для коллекции `users` (для всех ролей, с полями `displayName`, `phone`, `roles`, `createdAt`, `updatedAt`, `isBlocked`).
- [x] 1.2. **Firestore:** Спроектировать и утвердить схему для коллекции `partners` (для данных, специфичных для партнеров: `companyName`, `inn`, `status` [pending, approved, rejected], `description`, `resources`, `userId` [ссылка на `users`]).
- [x] 1.3. **Admin Tool:** Создать команду `create-user --phone <phone> --role <role>` для создания пользователя с нужной ролью.
- [x] 1.4. **Cloud Functions:** Реализовать функцию-триггер, которая при создании `user` с ролью `partner` автоматически создает для него соответствующий документ в `partners`.
- [x] 1.5. **Firebase Auth:** Настроить аутентификацию по номеру телефона (SMS). (Этот пункт больше конфигурационный).

## Этап 2: Ядро — Туры и AI-автоматизация
- [x] 2.1. **Firestore:** Спроектировать и утвердить схему для коллекции `tours` (включая `title`, `partnerId`, `status` [draft, pending_moderation, approved, rejected], `pricing` [min, normal, max], `aiDraft`, `rules` [age, gender, etc.]).
- [x] 2.2. **Cloud Functions:** Создать Callable Function, которую партнер вызывает для создания черновика тура. Функция принимает базовые данные, генерирует с помощью AI расширенное описание (`aiDraft`) и сохраняет тур в статусе `draft`.
- [x] 2.3. **Cloud Functions:** Создать Event-driven Function, которая срабатывает при переводе тура в статус `pending_moderation`. Функция проводит AI-проверку на анти-фрод и корректность, и либо публикует тур (`approved`), либо отправляет на доработку (`rejected`).
- [x] 2.4. **Storage:** Убедиться, что структура папок в Storage готова для хранения фото/видео туров (например, `tours/<tourId>/media/`).

## Этап 3: Взаимодействие — Бронирования и Рейтинги
- [x] 3.1. **Firestore:** Спроектировать и утвердить схему для коллекции `bookings` (`tourId`, `clientId`, `status` [requested, confirmed, completed, canceled], `bookingDate`).
- [x] 3.2. **Cloud Functions:** Реализовать логику создания, подтверждения и отмены бронирований.
- [x] 3.3. **Firestore:** Спроектировать и утвердить схему для коллекции `ratings` (`entityId` [tourId или partnerId], `authorId`, `rating`, `comment`, `target` [user, partner]).
- [x] 3.4. **Cloud Functions:** Реализовать логику для взаимных рейтингов и блокировок пользователей/партнеров.

## Этап 4: Персонализация — Лента
- [x] 4.1. **Firestore:** Спроектировать схему для коллекции `userActions` (`userId`, `actionType` [view, like, book], `entityId`, `timestamp`).
- [x] 4.2. **Cloud Functions:** Создать фоновую функцию, которая периодически (например, раз в час) анализирует `userActions` и генерирует персональные рекомендации, сохраняя их в `userFeeds`.
- [x] 4.3. **Frontend:** (За рамками бэкенда) Frontend будет забирать готовую ленту из `userFeeds`.



