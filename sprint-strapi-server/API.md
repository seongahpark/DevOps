# REST API 과제 제출

#### DevOps 01 박성아

JSON 결과는 내용이 길어 Notion에 모아 저장해두었습니다.

[JSON 결과보기](https://north-recorder-449.notion.site/JSON-1e41e51cddec48e5890f781abdc44c06)

| 카테고리 | 기능                | 메소드 | 엔드포인트        | 요청바디                                                     |
| -------- | ------------------- | ------ | ----------------- | ------------------------------------------------------------ |
| 조회     | 모든 블로그 글 조회 | GET    | /api/articles     | 없음                                                         |
| 조회     | 특정 블로그 글 조회 | GET    | /api/articles/:id | 없음                                                         |
| 조회     | 모든 댓글 조회      | GET    | /api/comments     | 없음                                                         |
| 조회     | 특정 댓글 조회      | GET    | /api/comments/:id | 없음                                                         |
| 생성     | 새 블로그 글 생성   | POST   | /api/articles     | { "data": { "writer" : "문자열", "body" : "문자열" } }       |
| 생성     | 새 댓글 생성        | POST   | /api/comments     | { "data": { ”article_idx” : 숫자, "writer" : "문자열", "text" : "문자열" } } |
| 삭제     | 특정 블로그 글 삭제 | DELETE | /api/articles/:id | 없음                                                         |
| 삭제     | 특정 댓글 삭제      | DELETE | /api/comments/:id | 없음                                                         |
| 수정     | 특정 블로그 글 수정 | PUT    | /api/articles/:id | { "data": { "writer" : "문자열", "body" : "문자열" } } 여기서 수정할 키와 값만 입력 |
| 수정     | 특정 댓글 수정      | PUT    | /api/comments/:id | { "data": { ”article_idx” : 숫자, "writer" : "문자열", "text" : "문자열" } } 여기서 수정할 키와 값만 입력 |

