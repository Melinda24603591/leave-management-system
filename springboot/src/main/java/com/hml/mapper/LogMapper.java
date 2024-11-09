package com.hml.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hml.domain.Leave;
import com.hml.domain.Log;
import com.hml.domain.LogDTO;
import com.hml.domain.User;

import java.util.List;

/**
* @author Administrator
* @description 针对表【user(用户表)】的数据库操作Mapper
* @createDate 2024-05-11 09:50:43
* @Entity com.hml.domain.User
*/
public interface LogMapper extends BaseMapper<Log> {
    Page<List<LogDTO>> getList(Page<LogDTO> page, LogDTO logDTO);

}




