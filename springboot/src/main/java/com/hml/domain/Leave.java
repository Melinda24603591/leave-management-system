package com.hml.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.util.Date;

/**
 * 请假表实体类
 */
@Data
@TableName(value ="leaves")
public class Leave {


    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 申请人
     */
    private Integer userId;

    /**
     * 请假类型
     */
    private Integer typeId;



    /**
     * 开始日期
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date startDate;

    /**
     * 结束日期
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date endDate;

    /**
     * 状态：0-待审批，1-已通过，2-已驳回
     */
    private String status;



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


    /**
     * 当前页
     */
    @TableField(exist = false)
    private String name;

    /**
     * 每页多少条
     */
    @TableField(exist = false)
    private String typeName;


    // Lombok的@Data注解会自动生成getter和setter方法，
    // 以及toString、equals和hashCode方法。
}