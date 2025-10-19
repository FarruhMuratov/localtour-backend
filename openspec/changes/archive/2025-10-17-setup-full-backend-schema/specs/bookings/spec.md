## ADDED Requirements
### Requirement: Tour Booking
Система MUST позволять клиентам бронировать туры.

#### Scenario: Successful Booking
- **GIVEN** клиент выбрал доступный тур.
- **WHEN** он нажимает "Забронировать".
- **THEN** система MUST создать документ в коллекции `bookings` со статусом `requested`.

### Requirement: Mutual Ratings
Система MUST позволять пользователям и партнерам оценивать друг друга после завершения тура.

#### Scenario: Rating after Tour
- **GIVEN** бронирование имеет статус `completed`.
- **WHEN** проходит 24 часа после завершения.
- **THEN** система MUST предоставить участникам возможность оставить рейтинг и отзыв друг о друге.
