## ADDED Requirements
### Requirement: Backend Administration CLI
Система MUST предоставлять CLI-инструмент (`admin_tool.py`) для выполнения административных задач в Firebase.

#### Scenario: Initialization
- **GIVEN** корректный `serviceAccountKey.json` находится в директории `admin_scripts`.
- **WHEN** любая команда CLI запускается.
- **THEN** инструмент MUST успешно инициализировать Firebase Admin SDK и подключиться к проекту.

#### Scenario: Update User Schema
- **GIVEN** инструмент инициализирован.
- **WHEN** администратор запускает команду `update-user-schema`.
- **THEN** система MUST:
  - Пройти по всем документам в коллекции `users`.
  - Добавить отсутствующие поля (`displayName`, `createdAt`, `roles`) со значениями по умолчанию.
  - Вывести в консоль отчет о количестве обновленных пользователей.

#### Scenario: Missing Service Account Key
- **GIVEN** файл `serviceAccountKey.json` отсутствует.
- **WHEN** любая команда CLI запускается.
- **THEN** инструмент MUST завершиться с ошибкой и понятным сообщением о необходимости настроить ключ доступа.
