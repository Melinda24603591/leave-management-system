package com.hml.controller;



import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hml.common.Result;
import com.hml.domain.Leave;
import com.hml.domain.Log;
import com.hml.domain.User;
import com.hml.mapper.LeaveMapper;
import com.hml.mapper.LogMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@Api(tags = "请假")
@RequestMapping("/leave")
public class LeaveController {
    @Autowired
    private LeaveMapper leaveMapper;


    @Autowired
    private LogMapper logMapper;

    @ApiOperation("获取请假列表")
    @PostMapping("/getList")
    public Result getList(@RequestBody Leave leave){


        Page<List<Leave>> list = leaveMapper.getList(new Page<>(leave.getPageNum(), leave.getPageSize()), leave);
        return Result.success(list);

    }


    @PostMapping("/edit")
    @ApiOperation("修改")
    public Result edit(@RequestBody Leave leave){
        int i = leaveMapper.updateById(leave);
        if (i > 0){
            return Result.success();
        }
        return Result.fail();
    }


    @PostMapping("/sp")
    @ApiOperation("审判")
    public Result sp(@RequestBody Leave leave){



        int i = leaveMapper.updateById(leave);

        Log log = new Log();
        log.setLeaveId(String.valueOf(leave.getId()));
        log.setCreateTime(new Date());
        log.setUserId(leave.getUserId());

        logMapper.insert(log);

        if (i > 0){
            return Result.success();
        }
        return Result.fail();
    }


    @PostMapping("/add")
    @ApiOperation("新增")
    @Transactional
    public Result add(@RequestBody  Leave leave){

        int insert = leaveMapper.insert( leave);
        if (insert > 0){
            return Result.success();
        }
        return Result.fail();
    }

    @GetMapping("/getInfo")
    @ApiOperation("详情")
    public Result getInfo(Leave leave){


        Leave getinfo = leaveMapper.getOneBy( leave);

        return Result.success(getinfo);
    }


    @GetMapping("/delete")
    @ApiOperation("删除")
    public Result delete(Leave leave){
        int i = leaveMapper.deleteById(leave.getId());
        if (i > 0){
            return Result.success();
        }
        return Result.fail();
    }





    @GetMapping("/getData")
    @ApiOperation("")
    public Result deletes(Leave leave){
        int i = leaveMapper.deleteById(leave.getId());
        if (i > 0){
            return Result.success();
        }
        return Result.fail();
    }





//    @GetMapping("/getInfo")
//    @ApiOperation("获取用户信息")
//    public Result getInfo(String token) {
//        QueryWrapper<User> wrapper = new QueryWrapper<>();
//        wrapper.eq("token",token);
//        User user = leaveMapper.selectOne(wrapper);
//        if (user == null) {
//            return Result.fail("用户不存在");
//        }
//        return Result.success(user);
//    }
//
//    @GetMapping("/list")
//    @ApiOperation("获取用户列表")
//    public Result list(@RequestParam("pageSize") Integer pageSize,
//                       @RequestParam("pageNum") Integer pageNum,
//                       User user) {
//        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
//        wrapper.eq(user.getName() != null, User::getName, user.getName());
//        Page<User> page = new Page<>(pageSize, pageNum, true);
//        IPage<User> userIPage = leaveMapper.selectPage(page, wrapper);
//        return Result.success(userIPage);
//    }
//
//    @PostMapping("/add")
//    @ApiOperation("修改和删除共用   当你传id的时候是修改  不传id是修改")
//    public Result add(@RequestBody User user) {
//        Map<String,Object> map = new HashMap<>();
//        if (user.getId() != null){
//            map.put("id",user.getId());
//        }
//        map.put("code",user.getUsername());
//        map.put("cname",user.getName());
//        map.put("isActive",'1');
//        String link = Vpn.postLink("/super/projUser/save", map,user.getToken());
//        JSONObject obj = new JSONObject(link);
//        String isOk = obj.getStr("isOk");
//        if ("true".equals(isOk)){
//            if (user.getId() != null){
//                leaveMapper.updateById(user);
//            }else{
//                Map<String ,Object> map1 = new HashMap<>();
//                map1.put("sort","id");
//                map1.put("order","ace");
//                map1.put("offset","0");
//                map1.put("limit","10");
//
//                user.setId(obj.getInt("id"));
//                System.out.println(obj);
//                leaveMapper.insert(user);
//            }
//            return Result.success();
//        }
//        return Result.fail();
//    }
//
//    @ApiOperation("删除用户")
//    @GetMapping("/delete")
//    public Result delete(Integer id) {
//        int i = leaveMapper.deleteById(id);
////        User user = leaveMapper.selectById(id);
////        if (user == null) {
////            return Result.fail("用户不存在");
////        }
////        Map<String,Object> map = new HashMap<>();
////        map.put("id",user.getId());
////        String link = Vpn.postLink("/super/projUser/delete", map,user.getToken());
////        JSONObject obj = new JSONObject(link);
////        String isOk = obj.getStr("isOk");
////        if ("true".equals(isOk)){
////            leaveMapper.deleteById(id);
////            return Result.success();
////        }
//        return Result.success();
////        return Result.fail();
//    }
//
//    @ApiOperation("重置密码")
//    @PostMapping("/resetPwd")
//    public Result resetPwd(@RequestBody  User user) {
//        Map<String,Object> map = new HashMap<>();
//        map.put("id",user.getId());
//        map.put("newPassword",user.getPassword());
//        map.put("oldPassword",user.getOldPassword());
//
//        String link = Vpn.postLink("/super/projUser/resetPwd", map,user.getToken());
//        JSONObject obj = new JSONObject(link);
//        String isOk = obj.getStr("isOk");
//        if ("true".equals(isOk)){
//            leaveMapper.updateById(user);
//            return Result.success();
//        }
//        return Result.fail("修改失败");
//    }

}
