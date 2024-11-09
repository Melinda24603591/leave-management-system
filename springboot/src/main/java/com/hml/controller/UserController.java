package com.hml.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hml.common.Result;
import com.hml.domain.User;
import com.hml.mapper.UserMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "用户")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserMapper userMapper;

    @ApiOperation("获取用户列表")
    @GetMapping("/getList")
    public Result getList(){
        return Result.success(userMapper.selectList(null));
    }


    @GetMapping("/list")
    @ApiOperation("列表可根据name进行搜索")
    public Result list(@RequestParam("pageSize") Long pageSize,
                       @RequestParam("pageNum") Long pageNum,
                       User user){
        LambdaQueryWrapper<User> wrapper = Wrappers.lambdaQuery();
        wrapper.like(user.getName() != null ,
                        User::getName,
                        user.getName())
                .eq(true,User::getRole,"1");
        Page<User> page = new Page<>(pageSize, pageNum, true);
        IPage<User> drugIPage = userMapper.selectPage(page, wrapper);
        return Result.success(drugIPage);
    }
    @PutMapping("/edit")
    @ApiOperation("修改")
    public Result edit(@RequestBody User user){
        int i = userMapper.updateById(user);
        if (i > 0){
            return Result.success();
        }
        return Result.fail();
    }

    @PostMapping("/add")
    @ApiOperation("新增")
    @Transactional
    public Result add(@RequestBody User user){
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username",user.getUsername());
        User user1 = userMapper.selectOne(wrapper);
        if (user1 != null){
            return Result.fail("已存在当前账户");
        }
        int insert = userMapper.insert(user);
        if (insert > 0){
            return Result.success();
        }
        return Result.fail();
    }

    @GetMapping("/getInfo")
    @ApiOperation("详情")
    public Result getInfo(User user){
        User getinfo = userMapper.selectById(user.getId());
        return Result.success(getinfo);
    }
    @DeleteMapping("/delete")
    @ApiOperation("删除")
    public Result delete(User user){
        int i = userMapper.deleteById(user.getId());
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
//        User user = userMapper.selectOne(wrapper);
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
//        IPage<User> userIPage = userMapper.selectPage(page, wrapper);
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
//                userMapper.updateById(user);
//            }else{
//                Map<String ,Object> map1 = new HashMap<>();
//                map1.put("sort","id");
//                map1.put("order","ace");
//                map1.put("offset","0");
//                map1.put("limit","10");
//
//                user.setId(obj.getInt("id"));
//                System.out.println(obj);
//                userMapper.insert(user);
//            }
//            return Result.success();
//        }
//        return Result.fail();
//    }
//
//    @ApiOperation("删除用户")
//    @GetMapping("/delete")
//    public Result delete(Integer id) {
//        int i = userMapper.deleteById(id);
////        User user = userMapper.selectById(id);
////        if (user == null) {
////            return Result.fail("用户不存在");
////        }
////        Map<String,Object> map = new HashMap<>();
////        map.put("id",user.getId());
////        String link = Vpn.postLink("/super/projUser/delete", map,user.getToken());
////        JSONObject obj = new JSONObject(link);
////        String isOk = obj.getStr("isOk");
////        if ("true".equals(isOk)){
////            userMapper.deleteById(id);
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
//            userMapper.updateById(user);
//            return Result.success();
//        }
//        return Result.fail("修改失败");
//    }

}
