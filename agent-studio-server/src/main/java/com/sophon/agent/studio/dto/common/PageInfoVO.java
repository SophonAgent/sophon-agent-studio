package com.sophon.agent.studio.dto.common;

import lombok.Data;

/**
 * @ClassName PageInfoVO
 * @Description
 * @Author chun
 **/
@Data
public class PageInfoVO {
    int pageNum = 1; // 页码

    int pageSize = 10; // 页面大小

    int prePage; // 上页

    int nextPage; // 下页

    int pages; // 总共多少页

    boolean hasNextPage; // 是否有下页

    long total; // 总共多少条记录


    public static void buildPagination(PageInfoVO page){
        // 计算总页数
        page.pages = (int)(page.getTotal() + page.getPageSize() - 1) / page.getPageSize();

        // 计算是否有下一页
        page.hasNextPage = page.getPageNum()< page.pages;

        // 计算上一页
        page.prePage = (page.getPageNum() > 1) ? page.getPageNum() - 1 : 1;

        // 计算下一页
        page.nextPage = (page.getPageNum() < page.pages) ? page.getPageNum() + 1 : page.pages;
    }

}
