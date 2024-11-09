package com.hml.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hml.domain.Leave;


import java.util.List;

public interface LeaveMapper extends BaseMapper<Leave> {

    Page<List<Leave>>  getList(Page<Leave> page,  Leave leave);


    Leave  getOneBy(Leave leave);
}




