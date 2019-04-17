# deviltea.io API

[toc]

## users 相關

### （Public）`POST` - `/api/users/login`

> 使用者登入

**Request**：

```json
{
  "idToken": string
}
```

**Response**：

`status 200`

```json
{
  "token": string
}
```

`status 404`

```json
{
  "message": string
}
```

### （Private）`POST` - `/api/users/auth`

> 使用者驗證

**Request**：

No content

**Response**：

`status 200`

```json
{
  "name": string,
  "avatarUrl": string,
  "permission": number
}
```

`status 401`

```json
{
  "message": string
}
```

### （Public）`GET` - `/api/users/info/:userId`

> 取得使用者資訊（userId === self 依照 token 取得）

**Request**：

No content

**Response**：

`status 200`

```json
{
  "name": string,
  "avatarUrl": string,
  "permission": number
}
```

`status 404`

```json
{
  "message": string
}
```

## articles 相關

### （Public）`GET` - `/api/articles`

> 取得文章 ID 列表

**Request**：

QueryString：

- index：起始索引（預設為 0）
- amount：索引數量（預設為 10）
- tags：以 tag 過濾文章列表
- sort：排序方式
  - publish：發表時間
  - views：觀看數
  - comments：留言數
- descending：搭配 sort 使用，降冪排序（預設為 false）

**Response**：

`status 200`

```json
{
    "articlesId": string[]
}
```

`status 400`

```json
{
  "message": string
}
```

### （Admin）`POST` - `/api/articles`

> 發表新文章

**Request**：

```json
{
  "title": string,
  "tags": string[],
  "content": string
}
```

**Response**：

`status 200`

```json
{
  "articleId": string
}
```

`status 400`

```json
{
  "message": string
}
```

`status 401`

```json
{
  "message": string
}
```

`status 403`

```json
{
  "message": string
}
```

### （Public）`GET` - `/api/articles/:articleId`

> 根據 ID 取得文章

**Request**：

No content

**Response**：

`status 200`

```json
{
  "title": string,
  "tags": string[],
  "content": string,
  "viewCount": number,
  "createdTime": Date,
  "updatedTime": Date | undefined,
  "deleted": boolean,
}
```

`status 404`

```json
{
  "message": string
}
```

### （Admin）`PATCH` - `/api/articles/:articleId`

> 根據 ID 更新文章

**Request**：

```json
{
  "title": string | undefined,
  "tags": string[] | undefined,
  "content": string | undefined
}
```

**Response**：

`status 200`

```json
{
  "id": string
}
```

`status 401`

```json
{
  "message": string
}
```

`status 403`

```json
{
  "message": string
}
```

`status 404`

```json
{
  "message": string
}
```

### （Admin）`DELETE` - `/api/articles/:articleId`

> 根據 ID 刪除文章

**Request**：

No content

**Response**：

`status 204`

No content

`status 401`

```json
{
  "message": string
}
```

`status 403`

```json
{
  "message": string
}
```

`status 404`

```json
{
  "message": string
}
```

### （Public）`POST` - `/api/articles/:articleId/views/count`

> 根據 ID 更新文章瀏覽次數

**Request**：

No content

**Response**：

`status 200`

```json
{
  "viewCount": number
}
```

`status 404`

```json
{
  "message": string
}
```

### （Public）`GET` - `/api/articles/:articleId/comments`

> 根據文章 ID 取得留言 ID 列表

**Request**：

QueryString：

- index：起始索引（預設為 0）
- amount：索引數量（預設為 10）
- sort：排序方式
  - publish：發表時間
- descending：搭配 sort 使用，降冪排序（預設為 false）

**Response**：

`status 200`

```json
{
  "commentsId": string[]
}
```

`status 400`

```json
{
  "message": string
}
```

`status 404`

```json
{
  "message": string
}
```

### （Private）`POST` - `/api/articles/:articleId/comments`

> 根據文章 ID 發表留言

**Request**：

```json
{
  "userId": string,
  "content": string
}
```

**Response**：

`status 200`

```json
{
  "userId": string,
  "content": string,
  "createdTime": Date,
  "updatedTime": Date | undefined,
  "deleted": boolean
}
```

`status 400`

```json
{
  "message": string
}
```

`status 401`

```json
{
  "message": string
}
```

`status 404`

```json
{
  "message": string
}
```

### （Public）`GET` - `/api/articles/:articleId/comments/:commentId`

> 根據文章 ID 與留言 ID 取得留言

**Request**：

No content

**Response**：

`status 200`

```json
{
  "userId": string,
  "content": string,
  "createdTime": Date,
  "updatedTime": Date | undefined,
  "deleted": boolean
}
```

`status 404`

```json
{
  "message": string
}
```

### （Private）`PATCH` - `/api/articles/:articleId/comments/:commentId`

> 根據文章 ID 與留言 ID 更新留言

**Request**：

```json
{
  "content": string
}
```

**Response**：

`status 200`

```json
{
  "userId": string,
  "content": string,
  "createdTime": Date,
  "updatedTime": Date | undefined,
  "deleted": boolean
}
```

`status 400`

```json
{
  "message": string
}
```

`status 401`

```json
{
  "message": string
}
```

`status 403`

```json
{
  "message": string
}
```

`status 404`

```json
{
  "message": string
}
```

### （Private）`DELETE` - `/api/articles/:articleId/comments/:commentId`

> 根據文章 ID 與留言 ID 刪除留言

**Request**：

No content

**Response**：

`status 204`

No content

`status 401`

```json
{
  "message": string
}
```

`status 403`

```json
{
  "message": string
}
```

`status 404`

```json
{
  "message": string
}
```

### （Public）`GET` - `/api/articles/:articleId/comments/count`

> 根據 ID 取得文章留言數

**Request**：

No content

**Response**：

`status 200`

```json
{
  "commentCount": number
}
```

`status 404`

```json
{
  "message": string
}
```
