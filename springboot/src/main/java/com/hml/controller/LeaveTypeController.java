package com.hml.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hml.common.Result;
import com.hml.domain.LeaveType;
import com.hml.domain.User;
import com.hml.mapper.LeaveTypeMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@Api(tags = "请假类型表")
@RequestMapping("/leaveType")
public class LeaveTypeController {
    @Autowired
    private LeaveTypeMapper leaveTypeMapper;

    @ApiOperation("获取用户列表")
    @PostMapping("/getList")
    public Result getList(@RequestBody  LeaveType leaveType){

        LambdaQueryWrapper<LeaveType> wrapper = Wrappers.lambdaQuery();
        wrapper.like(StringUtils.isNotBlank(leaveType.getName()),
        
        LeaveType::getName,
                                leaveType.getName());


        Page<LeaveType> page = new Page<>(leaveType.getPageNum(), leaveType.getPageSize(), true);

        IPage<LeaveType> drugIPage  = leaveTypeMapper.selectPage(page, wrapper);



        return Result.success(drugIPage);
        
    }



    @PostMapping("/edit")
    @ApiOperation("修改")
    public Result edit(@RequestBody LeaveType leaveType){
        int i = leaveTypeMapper.updateById(leaveType);
        if (i > 0){
            return Result.success();
        }
        return Result.fail();
    }

    @PostMapping("/add")
    @ApiOperation("新增")
    @Transactional
    public Result add(@RequestBody LeaveType leaveType){
        leaveType.setCreateTime(new Date());

        int insert = leaveTypeMapper.insert(leaveType);
        if (insert > 0){
            return Result.success();
        }
        return Result.fail();
    }

    @GetMapping("/getInfo")
    @ApiOperation("详情")
    public Result getInfo(LeaveType leaveType){
        LeaveType getinfo = leaveTypeMapper.selectById(leaveType.getId());
        return Result.success(getinfo);
    }
    @GetMapping("/delete")
    @ApiOperation("删除")
    public Result delete(LeaveType leaveType){
        int i = leaveTypeMapper.deleteById(leaveType.getId());
        if (i > 0){
            return Result.success();
        }
        return Result.fail();
    }








}
