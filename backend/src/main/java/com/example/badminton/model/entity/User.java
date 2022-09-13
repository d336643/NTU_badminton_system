package com.example.badminton.model.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Table(	name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "sid"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {

    @Column(name = "id")
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 20)
    private String sid;

    @NotNull
    @Min(1)
    @Max(5)
    @Column(columnDefinition = "integer default 1")
    private Integer status;

    @NotNull
    private Integer degreeId;

    @NotBlank
    @Size(min = 4, max = 4)
    private String departmentId;

    @NotBlank
    @Size(min = 10, max = 10)
    private String birthday;

    @Size(max = 10)
    private String iid;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 10)
    private String phone;

    @Size(max = 50)
    private String address;

    @NotBlank
    @Size(max = 120)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


//    @OneToMany(mappedBy = "applier", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "applier", cascade = CascadeType.ALL)
    @Fetch(value= FetchMode.SELECT)
    @ToString.Exclude
    private Set<Registration> registrations = new HashSet<>();

//    @Column(name = "created_time", nullable = false, insertable = false, updatable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP")
//    @CreatedDate
//    protected Instant createdTime;
//
//    @Column(name = "updated_time", nullable = false, insertable = false, updatable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
//    @LastModifiedDate
//    protected Instant updatedTime;

}
