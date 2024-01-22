insert into
  store_collection (id, title, featured_product_id)
values
  (1, 'Flowers', null),
  (2, 'Grocery', null),
  (3, 'Beauty', null),
  (4, 'Cleaning', null),
  (5, 'Stationary', null),
  (6, 'Pets', null),
  (7, 'Baking', null),
  (8, 'Spices', null),
  (9, 'Toys', null),
  (10, 'Magazines', null);

insert into
  store_product (
    id,
    title,
    description,
    unit_price,
    inventory,
    last_update,
    collection_id,
    slug
  )
values
  (
    1,
    'Bread Ww Cluster',
    'mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus',
    4.00,
    11,
    '2020-09-11 00:00:00',
    6,
    '-'
  ),
  (
    2,
    'Island Oasis - Raspberry',
    'maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque',
    84.64,
    40,
    '2020-07-07 00:00:00',
    3,
    '-'
  ),
  (
    3,
    'Shrimp - 21/25, Peel And Deviened',
    'nisi volutpat eleifend donec ut dolor morbi vel lectus in quam',
    11.52,
    29,
    '2021-04-05 00:00:00',
    3,
    '-'
  ),
  (
    4,
    'Wood Chips - Regular',
    'posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut',
    73.47,
    40,
    '2020-07-20 00:00:00',
    5,
    '-'
  );