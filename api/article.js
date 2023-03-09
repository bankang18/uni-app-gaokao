import request from "@/utils/request";

export function getArticleDetail(data) {
    return request({
        url: '/article/details',
        method: 'GET',
        data: data
    })
}

/**
 * 获取文章评论列表
 */
export function getArticleCommentList(data) {
    return request({
      url: '/article/comment/list',
      data
    });
  }
  