package com.hml.controller;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hml.common.Result;
import com.hml.domain.Log;
import com.hml.domain.LogDTO;
import com.hml.mapper.LogMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(tags = "审批日志表")
@RequestMapping("/Log")
public class LogController {
    @Autowired
    private LogMapper logMapper;

    @ApiOperation("获取审批日志列表")
    @GetMapping("/getList")
    public Result list(LogDTO logDTO){

        Page<List<LogDTO>> list = logMapper.getList(new Page<>(logDTO.getPageNum(), logDTO.getPageSize()), logDTO);
        return Result.success(list);
    }


    @PutMapping("/edit")
    @ApiOperation("修改")
    public Result edit(@RequestBody Log log){
        int i = logMapper.updateById(log);
        if (i > 0){
            return Result.success();
        }
        return Result.fail();
    }

    @PostMapping("/add")
    @ApiOperation("新增")
    @Transactional
    public Result add(@RequestBody Log log){

        int insert = logMapper.insert(log);
        if (insert > 0){
            return Result.success();
        }
        return Result.fail();
    }

    @GetMapping("/getInfo")
    @ApiOperation("详情")
    public Result getInfo(Log log){
        Log getinfo = logMapper.selectById(log.getId());
        return Result.success(getinfo);
    }
    @DeleteMapping("/delete")
    @ApiOperation("删除")
    public Result delete(Log log){
        int i = logMapper.deleteById(log.getId());
        if (i > 0){
            return Result.success();
        }
        return Result.fail();
    }








}
