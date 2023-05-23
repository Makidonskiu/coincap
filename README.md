# Cryptocurrency Portfolio Tracker

Это приложение для отслеживания криптовалют и управления собственным портфелем.

## Технологии
- React
- Redux/toolkit
- Redux-persist
- React-chartjs-2
- Axios
- UI Framework: Ant Design (https://ant.design)
- Стилизация: CSS 

## API
Для получения данных о криптовалютах мы будем использовать Coincap API (https://docs.coincap.io).

## Главная страница
На главной странице отображается таблица с криптовалютами, их основной информацией и элементами управления для возможности добавления в портфель (например, "+"). Реализована пагинация.

При нажатии на элемент таблицы открывается страница с подробной информацией о выбранной валюте, а также графиком ее истории. На странице также присутствует элемент управления для добавления выбранной валюты в портфель.

При нажатии на кнопку "+", открывается модальное окно, в котором можно ввести количество (в том числе дробное) криптовалюты. После подтверждения, криптовалюта добавляется в портфель в указанном количестве.

## Шапка
Стоимость трех популярных криптовалют отображается рядом.
При нажатии на информацию о портфеле открывается модальное окно со списком валют в портфеле и возможностью удалить каждую из них из портфеля.

## Deploy https://makidonskiu.github.io/coincap/