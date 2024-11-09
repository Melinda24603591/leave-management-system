package com.hml.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

/**
 * 请假类型表
 */
@Data
@TableName(value ="leave_type")
public class LeaveType {

    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 类型名称
     */
    private String name;



    /**
     * 创建时间
     */
    private Date createTime;


    /**
     * 当前页
     */
    @TableField(exist = false)
    private Integer pageNum;

    /**
     * 每页多少条
     */
    @TableField(exist = false)
    private Integer pageSize;




}