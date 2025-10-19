# admin-tools Specification

## Purpose
TBD - created by archiving change create-backend-admin-center. Update Purpose after archive.
## Requirements
### Requirement: Backend Administration CLI
Система MUST предоставлять CLI-инструмент (`admin_tool.py`) для выполнения административных задач в Firebase.

#### Scenario: Create Storage Folder
- **GIVEN** инструмент инициализирован.
- **WHEN** администратор запускает команду `create-storage-folder` с параметром `--folder-name "user_videos"`.
- **THEN** система MUST:
  - Создать в Firebase Storage "папку" `user_videos`, загрузив в нее пустой файл `.placeholder`.
  - Вывести в консоль сообщение об успешном создании.

#### Scenario: Storage Folder Already Exists
- **GIVEN** "папка" `user_videos` уже существует в Storage.
- **WHEN** администратор запускает команду `create-storage-folder` с параметром `--folder-name "user_videos"`.
- **THEN** система MUST:
  - Не производить никаких изменений.
  - Вывести в консоль сообщение о том, что папка уже существует.

